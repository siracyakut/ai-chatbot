export default function MessageItem({ message }) {
  return message.isBot ? (
    <div className="w-full md:w-3/4 p-5 rounded-lg bg-[#1b1b1b]">
      {message.text}
    </div>
  ) : (
    <div className="w-full md:w-3/4 p-5 rounded-lg bg-[#ffdd29] text-black self-end">
      {message.text}
    </div>
  );
}
