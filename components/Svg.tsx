interface SvgProps extends SVG {}

export default function Svg({ viewBox, path }: SvgProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            <path d={path} />
        </svg>
    );
}
