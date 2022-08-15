import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"

const Page = ({isDark, setDark, name}) => {
    return (
        <div className="page">
            <Header isDark={isDark} name={name} />
            <Content isDark={isDark} name={name} />
            <Footer isDark={isDark} setDark={setDark} />
        </div>
    )
}

export default Page