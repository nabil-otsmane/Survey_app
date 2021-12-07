import React from "react";

export const Alert = {
    error: {
        color: "red",
        title: "error"
    },
    info: {
        color: "blue",
        title: "info"
    },
    success: {
        color: "green",
        title: "success"
    },
    none: {}
}

export const AlertContext = React.createContext({
    alert: Alert.none,
    msg: "",
    showAlert: () => {}
})