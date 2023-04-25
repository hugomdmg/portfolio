
export default function CV() {

    return (
        <div className="pdfContainer">
            <object id="pdfHolder" data="./cv-hugo.pdf" type="application/pdf" width="1100" height="600">
            </object>
        </div>
    )
}