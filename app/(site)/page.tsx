import data from "@/app/(site)/[slug]/data.json";
import ComponentIframe from "@/app/(site)/[slug]/components/component-iframe";
import Image from "next/image";
import Categories from "@/components/categories";

export default function Page() {
  return (
    <div className="container mx-auto space-y-10 px-4 py-10 lg:space-y-20 lg:py-20">
      <header className="mx-auto max-w-5xl space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-balance lg:text-5xl lg:leading-14">
          Reusable Shadcn UI Examples and Components
        </h1>
        <p className="text-muted-foreground text-balance lg:text-lg">
          Examples and components built with React and Tailwind CSS, compatible with Shadcn UI. It
          is open-source and includes a total of {data.length} examples and components.
        </p>
      </header>

      <Categories />

      <div className="block lg:hidden">
        <figure className="relative aspect-video w-full">
          <Image
            src={`${process.env.BASE_URL}/${data[0].info.cover_image}`}
            fill
            alt={`shadcn example ${data[0].meta.title}`}
          />
        </figure>
      </div>

      <div className="hidden lg:block">
        <ComponentIframe id={data[0].href} url={`/demo/${data[0].href}`} />
      </div>
    </div>
  );
}
