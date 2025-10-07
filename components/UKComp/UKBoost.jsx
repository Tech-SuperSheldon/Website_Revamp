import Image from "next/image";

export default function UKBoost() {
  return (
    <div className="w-full flex justify-center items-center px-6 md:px-12 py-6">
      <div className="relative w-[90%] md:w-[85%] aspect-[16/7] rounded-3xl overflow-hidden ">
        <Image
          src="/UK/bannerv1.png"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
