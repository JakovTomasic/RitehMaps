type Prop = {
    className?: string,
}

export default function CompassIcon({ className }: Prop) {

    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="9" />
            <polygon points="16.4,7.6 13.9,13.9 7.6,16.4 10.1,10.1" fill="currentColor" stroke="none" />
        </svg>
    );
}
