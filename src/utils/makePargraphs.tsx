import classNames from "classnames"


const makePargraphs = (text: string, className: {
  [key: string]: boolean
}) => {
  return (
    text.split("</br>").map((p, i) => (
      <>
        <p className={classNames(className)} key={i}>{p}</p>
        <br />
      </>
    ))
  )
}

export default makePargraphs