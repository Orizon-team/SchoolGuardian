import { FillButton } from '@/components/ui/button';
import { TextField, TextFieldForPassword } from '@/components/ui/text_field';

export default function Login() {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: "url('/study.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl-ori font-bold text-gray-900 mb-2 text-center">Inicio de sesión</h2>
                <p className="text-sm text-gray-600 text-center mb-5">
                    Ingresa tus datos para acceder a tu cuenta
                </p>

                <form className="space-y-4">
                    <TextField text="Nombre" placeHolder="Tu nombre" isWithIcon={false} />
                    <div className="flex justify-end">
                        <a href="#" className="text-sm-ori text-greyOri-500 hover:text-greyOri-950">
                            Olvidé mi contraseña
                        </a>
                    </div>
                    <TextFieldForPassword text="Contraseña" placeHolder="Tu contraseña" isWithIcon={true} />
                    <FillButton text="Iniciar Sesión" isWithIcon={false} isFullWidth={true} isFlex={false} />
                </form>

                <div className="mt-6 text-center text-sm-ori text-greyOri-500">
                    ¿No tienes una cuenta?
                    <a href="#" className="text-primaryOri font-medium"> Regístrate</a>
                </div>
            </div>
        </div>
    );
}