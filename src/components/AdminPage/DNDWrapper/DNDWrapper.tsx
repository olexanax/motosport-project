//libs
import React from "react";
import { useDrag, useDrop } from "react-dnd";

interface DNDWrapperProps {
  children: React.ReactNode;
  target: {
    id: number;
    order: number;
  };
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const DNDWrapper: React.FC<DNDWrapperProps> = ({
  children,
  target,
  moveItem,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { order: target.order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ highlighted, hovered }, drop] = useDrop({
    accept: "item",
    drop(item: { order: number }) {
      const dragOrder = item.order;
      const hoverOrder = target.order;

      moveItem(dragOrder, hoverOrder);
    },
    collect: (monitor) => ({
      highlighted: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
    hover(item: { order: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.order;
      const hoverIndex = target.order;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        scale: isDragging ? 1.05 : 1,
        filter: hovered ? "blur(1px)" : "blur(0px)",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
};

export default DNDWrapper;
