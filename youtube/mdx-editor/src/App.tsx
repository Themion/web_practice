import { useCallback, useEffect, useMemo, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import EasyMDE from "easymde";
import * as mdx from "@mdx-js/mdx";
import "easymde/dist/easymde.min.css";
import { renderToString } from "react-dom/server";

import styles from "./app.module.css";
import ReactMarkdown from "react-markdown";

function App() {
    const [value, setValue] = useState("initial value");
    const onChange = useCallback((value: string) => setValue(() => value), []);

    const options = useMemo(
        () =>
            ({
                sideBySideFullscreen: false,
                autofocus: true,
                spellChecker: false,
                previewRender(value) {
                    return renderToString(
                        <ReactMarkdown>{value}</ReactMarkdown>
                    );
                },
            } as EasyMDE.Options),
        []
    );

    return (
        <SimpleMdeReact
            className={styles.center}
            options={options}
            value={value}
            onChange={onChange}
        />
    );
}

export default App;
