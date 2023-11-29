"use client";

import React from "react";

// styles
import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
// components
import Image from "next/image";
import Label from "../ui/Label/Label";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
// images
import instagramLogoBlack from "../../../public/images/icons/instagramLogo.svg";
import contactPhoto from "../../../public/images/contactFormPhoto.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ContactUsSchema,
  ContactUsValidator,
} from "@/lib/validators/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import PhoneInput from "../ui/PhoneInput/PhoneInput";

interface ContactUsFormProps {
  onSuccess: () => void;
}

const ContactUsForm: React.FC<ContactUsFormProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsSchema>({
    resolver: zodResolver(ContactUsValidator),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<ContactUsSchema> = (values) => {
    // fetch logic
    reset();
    onSuccess();
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Contact us!</h2>
      <div className={styles.formContainer}>
        <div className={styles.formLeft}>
          <Image
            src={contactPhoto}
            alt="Contact Form Photo"
            width={383}
            height={409}
          />
          <h3 className={styles.formName}>Ivan Peklin</h3>
          <p className={styles.formSubtitle}>Lorem ipsum dolor sit amet</p>
        </div>
        <form className={styles.formRight} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formInner}>
            <div className={styles.formItemsWrapper}>
              <div className={styles.formItem}>
                <Label>Name*</Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      className={classNames(styles.formItemInput, {
                        [global.redBorder]: errors.name,
                      })}
                      type="text"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <span className={global.formError}>
                    *{errors.name.message}
                  </span>
                )}
              </div>
              <div className={styles.formItem}>
                <Label>Surname*</Label>
                <Controller
                  control={control}
                  name="surname"
                  render={({ field }) => (
                    <Input
                      className={classNames(styles.formItemInput, {
                        [global.redBorder]: errors.name,
                      })}
                      type="text"
                      {...field}
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
              <Label>E-Mail*</Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    className={classNames({
                      [global.redBorder]: errors.email,
                    })}
                    type="email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <span className={global.formError}>
                  *{errors.email.message}
                </span>
              )}
            </div>
            <div className={styles.formItem}>
              <Label>Phone*</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    className={classNames({
                      [global.redBorder]: errors.phone,
                    })}
                    type="phone"
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <span className={global.formError}>
                  *{errors.phone.message}
                </span>
              )}
            </div>
            <div className={styles.formItem}>
              <Label>Text</Label>
              <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                  <Textarea
                    className={classNames({
                      [global.redBorder]: errors.notes,
                    })}
                    rows={5}
                    {...field}
                  />
                )}
              />
              {errors.notes && (
                <span className={global.formError}>
                  *{errors.notes.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.formFooter}>
            <div className={styles.submitBtn}>
              <button type="submit" className={global.primaryButton}>
                Send
              </button>
            </div>
            <a
              href="https://www.instagram.com/ivan.peklin.racing?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
              className={styles.instagramLogo}
            >
              <Image
                src={instagramLogoBlack}
                width={52}
                height={52}
                alt="Intstagram Logo"
              />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
