import React from "react";
import { ContextualSaveBar } from "@shopify/polaris";

export const ContextualSaveBarComponent = ({
message,
onAction,
loading,
disabled,
discardAction
}) => (
    <ContextualSaveBar
        message={message}
        saveAction={{
            onAction: () => onAction(),
            loading: loading,
            disabled: disabled
        }}
        discardAction={{
            onAction: () => discardAction()
        }}
        fullWidth={true}
        alignContentFlush={true}
    />
);
