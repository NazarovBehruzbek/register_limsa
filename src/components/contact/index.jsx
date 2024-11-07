import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./contact.scss";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const location = useLocation()
  const check = location.pathname;
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
  const CHAT_ID = "-1002296221987";
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const onSubmit = async (formData) => {
    // Trigger validation for the phone number before proceeding
    const isPhoneValid = await trigger("phone");

    if (!isPhoneValid || !phone || phone.length < 13) {
      setError("phone", { type: "required", message: "To'liq raqam kiriting" });
      return;
    }

    setLoading(true);
    let phoneText = `Phone: ${phone}`;
    let fullName = `Fullname: ${formData?.fullName}`;
    let project = `Project: ${formData?.project}`;
    let price = `Price: ${formData?.price}`;

    const message = `${check !== "/travel" ? "#form":"#travel"} \n${formData?.fullName ? fullName : ""} \n${phone ? phoneText : ""} \n${formData?.project ? project : ""} \n${formData?.price ? price : ""}`;

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
        clearErrors(); // Clear all errors after successful submission
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
              setPhone(value);

              // Clear the phone error if the input meets the required length
              if (value && value.length === 13) {
                clearErrors("phone");
              } else if (value && value.length < 13) {
                setError("phone", { type: "required", message: "To'liq raqam kiriting" });
              }
            }}
            defaultCountry="UZ"
            id="phone"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div>
          <label style={{fontSize:'18px',marginBottom:'20px'}}><strong>Loyiha turini tanlang</strong></label>
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
                id="telegram bot"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("telegram bot")}
              />
              <label htmlFor="telegram bot">Telegram bot</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="dizayn"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("dizayn")}
              />
              <label htmlFor="dizayn">Dizayn</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="marketing"
                onChange={handleCheckboxChange}
                checked={selectedProjects.includes("marketing")}
              />
              <label htmlFor="marketing">Marketing</label>
            </div>
          </div>
        </div>

        {location.pathname !== "/travel" && (
          <div>
            <label htmlFor="price" style={{fontSize:'18px',lineHeight:'25px'}}> <strong>Loyihaga ajratgan byudjetingizni tanlang</strong> </label>
            <select {...register("price")} id="select" defaultValue={"Tanlang"}>
              <option>Tanlang</option>
              <option value="5mln">5 million gacha</option>
              <option value="5mln - 10mln">5 - 10 million UZS gacha</option>
              <option value="10mln - 20mln">10 - 20 million UZS gacha</option>
              <option value="20mln - 30mln">20 - 30 million UZS gacha</option>
              <option value="30mln">30 million UZS va undan yuqori</option>
            </select>
          </div>
        )}
    
        <button type="submit" disabled={loading}>
          {loading ? "loading..." : "Konsultatsiyaga yoziling"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
