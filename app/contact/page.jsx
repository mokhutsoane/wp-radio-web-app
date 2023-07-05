import ContactRow from "#/ui/contact/contact-row";
import FormPage from "./contact-form";
export default async function page() {
  return (
    <div className="">
      <div className="mb-8 rounded-lg p-px shadow-lg shadow-black/20">
        <div className="rounded-lg bg-black p-3.5 lg:p-6">
          <ContactRow />
        </div>
      </div>
      <FormPage />
    </div>
  );
}
