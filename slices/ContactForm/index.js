import { Bounded } from "../../components/Bounded";

const Field = ({ label, children }) => {
  return (
    <label>
      <span className="text-sm text-slate-500">{label}</span>
      {children}
    </label>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}) => {
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full appearance-none block w-full bg-gray-200 text-gray-700 border border-emerald-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      />
    </Field>
  );
};

const TextareaField = ({ label, name, placeholder, required = true }) => {
  return (
    <Field label={label}>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-40 w-full  appearance-none block w-full bg-gray-200 text-gray-700 border border-emerald-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      />
    </Field>
  );
};

const ContactForm = () => {
  return (
    <Bounded as="section" size="small">
      <form
        action="/api/contact"
        method="post"
        className="grid grid-cols-1 gap-6"
      >
        <InputField label="Name" name="name" placeholder="Jane Doe" />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="jane.doe@example.com"
        />
        <TextareaField
          label="Message"
          name="message"
          placeholder="Write your message here…"
        />
        <button
          type="submit"
          className="ml-auto inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded"
        >
          Send message{" "}
          <span aria-hidden={true} className="text-xl">
            &rarr;
          </span>
        </button>
      </form>
    </Bounded>
  );
};

export default ContactForm;
