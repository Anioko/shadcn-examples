import ComponentIframe from "@/app/(site)/[slug]/components/component-iframe";

import { Example } from "@/types/example";
import CodeDialog from "@/app/(site)/[slug]/components/code-dialog";
import { Button } from "@/components/ui/button";
import { FullscreenIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

export default function ExampleDetail({ example }: { example: Example }) {
  return (
    <>
      <header className="border-b py-6 lg:py-10">
        <div className="container mx-auto flex flex-col items-start justify-between space-y-4 px-4 lg:flex-row lg:items-center lg:space-y-0">
          <div className="space-y-3 lg:space-y-4">
            <h1 className="text-2xl font-bold lg:text-3xl">{example.meta.title}</h1>
            {example.info.description && (
              <p className="text-muted-foreground max-w-3xl">{example.info.description}</p>
            )}
          </div>
          <Button variant="outline" asChild>
            <Link
              href="https://github.com/shadcn-examples/shadcn-examples/discussions/categories/suggestions"
              target="_blank">
              <GithubIcon />
              Make a suggestion
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto space-y-10 px-4">
        <div className="mb-4 flex space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/demo/${example.href}`} target="_blank">
                  <FullscreenIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Full screen</p>
            </TooltipContent>
          </Tooltip>
          <CodeDialog example={example} />
        </div>

        <div className="block lg:hidden">
          <figure>
            <img
              src={`${process.env.BASE_URL}/${example.info.cover_image}`}
              className="w-full object-cover"
              alt={`shadcn example ${example.meta.title}`}
            />
          </figure>
        </div>

        <div className="hidden lg:block">
          <ComponentIframe id={example.href} url={`/demo/${example.href}`} />
        </div>
      </div>
    </>
  );
}
