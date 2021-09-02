import React, { Component } from "react"
import { greetText } from "./config.json"
import styles from "./test.css"
class Greeter extends Component {
    render() {
        return (
            <div className={styles.root}>
                {greetText}
            </div>
        )
    }
}
export default Greeter;