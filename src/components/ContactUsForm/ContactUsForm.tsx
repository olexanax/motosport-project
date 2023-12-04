"use client";

import React from "react";
// form
import {
  ContactUsSchema,
  ContactUsValidator,
} from "@/lib/validators/contact-us";
import { postCoachingForm } from "@/actions/send-coaching-form";
import { postPartnerForm } from "@/actions/send-partner-form";
import { SendEmailForm } from "@/actions/types/send-email";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// styles
import classNames from "classnames";
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
// components
import Image from "next/image";
import Label from "../ui/Label/Label";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import Button from "../ui/Button/Button";
import PhoneInput from "../ui/PhoneInput/PhoneInput";
// images
import instagramLogoBlack from "../../../public/images/icons/instagramLogo.svg";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes";
import { useTranslation } from "@/app/i18n/client";

interface ContactUsFormProps extends I18ComponentProps {
  onSuccess: () => void;
  type: "coaching" | "partner";
}

const ContactUsForm: React.FC<ContactUsFormProps> = ({
  onSuccess,
  type,
  lng,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { t } = useTranslation(lng, "translation");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsSchema>({
    resolver: zodResolver(ContactUsValidator),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<ContactUsSchema> = ({
    email,
    name,
    notes,
    phone,
    surname,
  }) => {
    setIsLoading(true);

    const payload: SendEmailForm = {
      first_name: name,
      last_name: surname,
      message: notes,
      email,
      phone,
    };

    switch (type) {
      case "coaching":
        postCoachingForm(payload)
          .then((data) => {
            if (data) {
              reset();
              onSuccess();
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      case "partner":
        postPartnerForm(payload)
          .then((data) => {
            if (data) {
              reset();
              onSuccess();
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInner}>
        <div className={styles.formItemsWrapper}>
          <div className={styles.formItem}>
            <Label
              className={classNames({
                [styles.whiteLabel]: type === "partner",
              })}
            >
              {t("content.form_nameInput")}*
            </Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  className={classNames(styles.formItemInput, {
                    [global.redBorder]: errors.name,
                  })}
                  type="text"
                  onChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled || isLoading}
                />
              )}
            />
            {errors.name && (
              <span className={global.formError}>*{errors.name.message}</span>
            )}
          </div>
          <div className={styles.formItem}>
            <Label
              className={classNames({
                [styles.whiteLabel]: type === "partner",
              })}
            >
              {t("content.form_surnameInput")}*
            </Label>
            <Controller
              control={control}
              name="surname"
              render={({ field }) => (
                <Input
                  className={classNames(styles.formItemInput, {
                    [global.redBorder]: errors.name,
                  })}
                  type="text"
                  onChange={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  disabled={field.disabled || isLoading}
                />
              )}
            />
            {errors.surname && (
              <span className={global.formError}>
                *{errors.surname.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.formItem}>
          <Label
            className={classNames({
              [styles.whiteLabel]: type === "partner",
            })}
          >
            {t("content.form_emailInput")}*
          </Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                className={classNames({
                  [global.redBorder]: errors.email,
                })}
                type="email"
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
              />
            )}
          />
          {errors.email && (
            <span className={global.formError}>*{errors.email.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label
            className={classNames({
              [styles.whiteLabel]: type === "partner",
            })}
          >
            {t("content.form_phoneInput")}*
          </Label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                className={classNames({
                  [global.redBorder]: errors.phone,
                })}
                type="phone"
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
              />
            )}
          />
          {errors.phone && (
            <span className={global.formError}>*{errors.phone.message}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <Label
            className={classNames({
              [styles.whiteLabel]: type === "partner",
            })}
          >
            {t("content.form_TextInput")}
          </Label>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <Textarea
                className={classNames({
                  [global.redBorder]: errors.notes,
                })}
                rows={5}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                disabled={field.disabled || isLoading}
              />
            )}
          />
          {errors.notes && (
            <span className={global.formError}>*{errors.notes.message}</span>
          )}
        </div>
      </div>
      <div
        className={classNames(styles.formFooter, {
          [styles.formFooterPartner]: type === "partner",
        })}
      >
        <div className={styles.submitBtn}>
          <Button type="submit" isLoading={isLoading}>
            {t("content.form_submitBanner")}
          </Button>
        </div>
        {type === "coaching" && (
          <a
            target="_blank"
            href={t("content.instagram_link")}
            className={styles.instagramLogo}
          >
            <Image
              src={instagramLogoBlack}
              width={52}
              height={52}
              alt="Intstagram Logo"
            />
          </a>
        )}
      </div>
    </form>
  );
};

export default ContactUsForm;
