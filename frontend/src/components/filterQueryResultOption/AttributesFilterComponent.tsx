import { Form } from "react-bootstrap";

export default function AttributesFilterComponent() {
  return (
    <>
    {[{ color: ["red", "blue", "green"] }, { ram: ["1 TB", "2 TB"] }].map(
  (item, idx) => {
    const [key, options] = Object.entries(item)[0]; // key: string, options: array
    
    return (
      <div key={idx} className="mb-3">
        <Form.Label>
          <b>{key}</b>
        </Form.Label>
        {options.map((i, idx) => (
          <Form.Check key={idx} type="checkbox" label={i} />
        ))}
      </div>
    );
  }
)}
  </>
  )
}
