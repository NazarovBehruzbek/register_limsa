import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./contact.scss";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    let updatedProjects;

    if (checked) {
      updatedProjects = [...selectedProjects, id];
    } else {
      updatedProjects = selectedProjects.filter((project) => project !== id);
    }

    setSelectedProjects(updatedProjects);
    setValue("project", updatedProjects.join(", "));
  };

  const TOKEN = "7835767023:AAHt3j3BWFwXlQL9ysCXjwD5RDYepxbae3I";
  const CHAT_ID = -1002296221987;
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const onSubmit = async (formData) => {
    if (!phone) {
      setError("phone", { type: "required", message: "Maydonni to'ldiring" });
      return;
    }

    setLoading(true);
    let phoneText = `Phone: ${phone}`;
    let fullName = `Fullname: ${formData?.fullName}`;
    let project = `Project: ${formData?.project}`;
    let price = `Price: ${formData?.price}`;

    const message = `${phone ? phoneText : ""}\n${
      formData?.fullName ? fullName : ""
    }\n${formData?.price ? price : ""}\n${formData?.project ? project : ""}`;

    try {
      let response = await fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      if (response?.ok) {
        toast.success("Muvaffaqiyatli yuborildi!");
        setPhone("");
        setSelectedProjects([]);
        reset();
      } else {
        toast.error("Ma'lumotlar yuborilmadi. Qayta urinib ko'ring!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <p>
        O'z loyihangiz haqida qisqacha tasnif bering va biz sizga 24 soat ichida
        qayta aloqaga chiqamiz
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName">Ism-familyangiz *</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", {
              required: { value: true, message: "Maydonni to'ldiring" },
              minLength: {
                value: 2,
                message: "Ism kamida 2 belgidan iborat bo'lishi kerak",
              },
            })}
          />
          {errors.fullName && (
            <p className="error">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone">Telefon raqamingiz *</label>
          <PhoneInput
            value={phone}
            limitMaxLength={true}
            onChange={(value) => {
              // Set a maximum length for the phone number, for example, 13 characters
              if (value && value.length <= 13) {
                setPhone(value);
              }
            }}
            defaultCountry="UZ"
            id="phone"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div>
          <label>Loyiha turini tanlang</label>
          <div className="project-box">
            <div className="checkbox">
              <input
                type="checkbox"
                id="web site"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("web site")}
              />
              <label htmlFor="web site">Web Site</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="mobile ilova"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("mobile ilova")}
              />
              <label htmlFor="mobile ilova">Online magazin</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="smm"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("smm")}
              />
              <label htmlFor="smm">CRM</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="telegram bot"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("telegram bot")}
              />
              <label htmlFor="telegram bot">Telegram bot</label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="price">Loyiha ajratgan byudjetingizni tanlang</label>
          <select {...register("price")} id="select" defaultValue={"Tanlang"}>
            <option>Tanlang</option>
            <option value="2000">$2000 gacha</option>
            <option value="2000-5000">$2000 - $5000</option>
            <option value="5000+">$5000 dan yuqori</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "Konsultatsiyaga yoziling"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
