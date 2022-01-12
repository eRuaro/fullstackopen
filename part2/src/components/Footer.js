import react from "react";

const Footer = () => {
    const footerStyle = {
        color: 'blue',
        fontStyle: 'italic',
        fontsize: 16,
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em> 
                Note app, Department of Computer Science, University of Helsinki 2021 
            </em>
        </div>    
    )
}

export default Footer;