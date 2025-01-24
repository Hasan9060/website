"use client";
import React, { useRef, useState, FormEvent } from "react";
import Image from "next/image";
import Feature from "@/components/Feature";
import emailjs from "@emailjs/browser";

interface ContactFormFields {
  your_name: string;
  email_address: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState<string>("");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm("service_m1oh17w", "template_i1j3e5g", form.current, {
          publicKey: "e_YWmh6uA0zJ5DtLb",
        })
        .then(
          (result) => {
            setFormStatus("SUCCESS");
            console.log("SUCCESS!", result.text);
          },
          (error) => {
            setFormStatus("FAILED");
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <>
      {/* Form Status Notification */}
      {formStatus && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 text-lg font-semibold ${
            formStatus === "SUCCESS" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          } rounded-md shadow-lg z-50`}
        >
          {formStatus === "SUCCESS"
            ? "Your message has been sent!"
            : "Something went wrong, please try again."}
        </div>
      )}

      <div>
        <Image
          src={"/images/contact.png"}
          alt="contact"
          width={1440}
          height={316}
          className="w-full h-auto mt-20"
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-10 px-4 lg:mt-20">
        <h1 className="text-[24px] sm:text-[30px] lg:text-[36px] font-semibold text-center">
          Get In Touch With Us
        </h1>
        <p className="text-[14px] sm:text-[16px] text-[#333333] mt-4 text-center max-w-[90%] lg:max-w-[644px]">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between mt-12 px-4 lg:px-16 gap-10">
        {/* Contact Information */}
        <div className="flex flex-col gap-8 lg:w-1/2">
          {[{ img: "/images/location.svg", title: "Address", desc: "236 5th SE Avenue, New York NY10000, United States" },
            { img: "/images/call.svg", title: "Phone", desc: "Mobile: +(84) 546-6789\nHotline: +(84) 456-6789" },
            { img: "/images/clock.svg", title: "Working Time", desc: "Monday-Friday: 9:00 - 22:00\nSaturday-Sunday: 9:00 - 21:00" }
          ].map((info, index) => (
            <div key={index} className="flex items-start gap-4">
              <Image
                src={info.img}
                alt={`${info.title}-icon`}
                width={22}
                height={28}
                className="min-w-[22px]"
              />
              <div>
                <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold">
                  {info.title}
                </h2>
                <p className="text-[14px] sm:text-[16px] text-gray-700 whitespace-pre-line">
                  {info.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="flex flex-col lg:w-1/2 gap-6">
          {[{ label: "Your Name", placeholder: "Enter your name", name: "from_name" },
            { label: "Email Address", placeholder: "Enter your email", name: "from_email" },
            { label: "Subject", placeholder: "Enter subject (optional)", name: "subject" },
            { label: "Message", placeholder: "Enter your message", name: "message" }
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`field-${index}`} className="text-[16px] font-semibold mb-2">
                {field.label}
              </label>
              {index === 3 ? (
                <textarea
                  id={`field-${index}`}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-md px-4 py-3 w-full text-[14px] focus:ring-2 focus:ring-[#B88E2F] focus:outline-none resize-none min-h-[100px]"
                />
              ) : (
                <input
                  id={`field-${index}`}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  className="border border-gray-300 rounded-md px-4 py-3 w-full text-[14px] focus:ring-2 focus:ring-[#B88E2F] focus:outline-none"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full lg:w-[237px] h-[55px] bg-[#B88E2F] text-white rounded-md mt-4 flex items-center justify-center text-[16px] font-semibold hover:bg-[#946F27] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Features Section */}
      <Feature />
    </>
  );
};

export default ContactPage;
