import { Heading } from "@chakra-ui/layout"
import { Children } from "react"
import { SlickSlider } from "../ReactSlick"


const CustomSlider = ({ name, children }: { name: string; children: any }) => {
    return (
        <>

            {name ? <Heading fontSize={{ base: '24px', md: '36px', xl: '48px' }} px={{ base: "0", md: "12px" }}>{name}</Heading> : ''}
            <SlickSlider>
                {children}
            </SlickSlider>
        </>
    )
}
export default CustomSlider
