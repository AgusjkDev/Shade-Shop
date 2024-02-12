interface UseFileInputProps {
    files: File[];
    onChange: (...event: any[]) => void;
}

export default function useFileInput({ files, onChange }: Readonly<UseFileInputProps>) {
    function handleChange(files_: File[]) {
        if (files_.length === 0) {
            return onChange(undefined);
        }

        onChange(files_);
    }

    function dedupe(files_: File[]) {
        return Object.values(
            files_.reduce<Record<string, File>>((acc, file) => {
                acc[file.name] = file;

                return acc;
            }, {}),
        );
    }

    function move(index: number, direction: "up" | "down") {
        if (files.length <= 1) return;

        if (direction === "up") {
            if (index === 0) {
                return handleChange(files.slice(1).concat(files[0]!));
            }

            return handleChange(files.toSpliced(index - 1, 2, files[index]!, files[index - 1]!));
        }

        if (index === files.length - 1) {
            return handleChange(files.slice(-1).concat(files.slice(0, -1)));
        }

        handleChange(files.toSpliced(index, 2, files[index + 1]!, files[index]!));
    }

    function remove(index: number) {
        handleChange(files.filter((_, fileIndex) => index !== fileIndex));
    }

    return { handleChange, dedupe, move, remove };
}
