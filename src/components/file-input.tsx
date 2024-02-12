import * as React from "react";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";
import { useFileInput } from "@/hooks";
import { cn } from "@/lib/utils";

interface FileInputProps extends Omit<React.ComponentPropsWithRef<"input">, "type" | "value"> {
    value?: File[] | FileList;
    onChange: (...event: any[]) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, Readonly<FileInputProps>>(
    ({ className, title = "", value, onChange, ...props }, ref) => {
        const files = Array.from(value ?? []);
        const { handleChange, dedupe, move, remove } = useFileInput({ files, onChange });

        return (
            <div className="flex w-full flex-col gap-y-2">
                <input
                    ref={ref}
                    type="file"
                    multiple
                    title={title}
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "relative w-full select-none file:sr-only after:absolute after:inset-0 after:flex after:items-center after:bg-background after:px-3 after:font-normal after:[content:'Selecciona_archivos'] hover:cursor-pointer hover:bg-inherit focus-visible:bg-inherit",
                        className,
                    )}
                    onChange={e => {
                        handleChange(dedupe([...files, ...Array.from(e.target.files ?? [])]));
                    }}
                    {...props}
                />

                {files.map(({ name }, index) => (
                    <div key={name} className="flex items-center gap-x-1">
                        <div className="flex items-center gap-x-0.5">
                            <button
                                type="button"
                                className="rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                onClick={() => move(index, "up")}
                            >
                                <ArrowUpIcon className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                className="rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                onClick={() => move(index, "down")}
                            >
                                <ArrowDownIcon className="h-3.5 w-3.5" />
                            </button>

                            <button
                                type="button"
                                className="rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                                onClick={() => remove(index)}
                            >
                                <TrashIcon className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <span className="text-sm leading-none">{name}</span>
                    </div>
                ))}
            </div>
        );
    },
);

export default FileInput;
