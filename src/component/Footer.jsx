import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
    return (
        <footer className="footer text-light py-4 mt-auto">
            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-3 black">
                        <h2><strong>MiaurKet</strong></h2>
                        <p>Lunes a Sábados 10hs a 18:30hs</p>
                    </div>

                    <div className="col-md-4 mb-3 black">
                        <h5><strong>Contacto</strong></h5>
                        <p>Email: catweb@catweb.com</p>
                    </div>

                    <div className="col-md-4 mb-3 black">
                        <h5><strong>Redes sociales</strong></h5>
                        <a href="https://facebook.com" className="text-light me-2 ">
                            <FacebookIcon />
                        </a>
                        <a href="https://instagram.com" className="text-light me-2">
                            <InstagramIcon />
                        </a>
                        <a href="mailto:contacto@miempresa.com" className="text-light me-2">
                            <EmailIcon />
                        </a>
                        <a href="mailto:contacto@miempresa.com" className="text-light">
                            <LinkedInIcon />
                        </a>
                    </div>

                </div>
                <hr className="border-light" />
                <p className="text-center mb-0 black">
                    © {new Date().getFullYear()} CatWebs. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    )
}
