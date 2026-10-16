import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";
import contactBackground from "../../imports/background1.png";

export function Contact() {
  const { lang } = useLang();
  const tx = t[lang].contact;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#FFF5F5] border border-[#77080E]/15 rounded-2xl text-[#3D0A0F] text-sm px-4 py-3.5 focus:outline-none focus:border-[#77080E]/50 transition-colors";

  const labelClass =
    "text-[#77080E]/70 text-xs uppercase tracking-[0.2em] block mb-2 font-light";

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden"
      style={{
        backgroundImage: `url("${contactBackground}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-14 sm:gap-20 items-start">
          <div>
            <p className="text-[#77080E]/60 text-xs tracking-[0.35em] uppercase mb-6 font-light">
              {tx.eyebrow}
            </p>

            <h2 className="font-['Cormorant_Garamond'] font-light text-[#77080E] mb-6">
              {tx.headline1}
              <br />
              <em>{tx.headline2}</em>
            </h2>

            <p className="text-[#5C1A20]/60 text-sm leading-relaxed font-light mb-10 max-w-sm">
              {tx.body}
            </p>

            <div className="space-y-5">
              {tx.details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <span className="text-[#77080E]/50 text-[10px] tracking-[0.2em] uppercase font-light w-20 flex-shrink-0 mt-0.5">
                    {detail.label}
                  </span>

                  <span className="text-[#5C1A20]/80 text-sm font-light">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white rounded-[2rem] p-10 text-center border border-[#77080E]/10 shadow-xl">
                <div className="w-12 h-12 rounded-full bg-[#77080E]/10 flex items-center justify-center mx-auto mb-5">
                  <div className="w-4 h-4 rounded-full bg-[#77080E]" />
                </div>

                <h3 className="font-['Cormorant_Garamond'] text-[#77080E] text-2xl mb-2 italic">
                  {tx.form.successTitle}
                </h3>

                <p className="text-[#5C1A20] text-sm font-light">
                  {tx.form.successBody}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#77080E]/10 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        {tx.form.firstName}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        required
                        type="text"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        {tx.form.lastName}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        required
                        type="text"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {tx.form.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      type="email"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      {tx.form.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className={labelClass}>
                      {tx.form.interest}
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">
                        {tx.form.interestPlaceholder}
                      </option>

                      {t[lang].services.items.map((service) => (
                        <option key={service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))}

                      {t[lang].pricing.plans.map((plan) => (
                        <option key={plan.name} value={plan.name}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      {tx.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder={tx.form.messagePlaceholder}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#77080E] hover:bg-[#CF1028] text-white border-0 py-3.5 text-xs rounded-full font-light tracking-widest uppercase transition-all"
                  >
                    {tx.form.submit}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}