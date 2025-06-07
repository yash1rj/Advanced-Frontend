import { JSX } from "react";

export type ModalProps = {
    title: {
        heading: string;
        subHeading?: string;
    };
    content: JSX.Element;
    actions?: JSX.Element;
    onModalClose?: () => void;
}