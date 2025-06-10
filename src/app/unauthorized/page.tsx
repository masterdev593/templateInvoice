// app/unauthorized/page.tsx

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold">Acceso no permitido</h1>
      <p className="mt-4 text-gray-600">
        Tu correo no está autorizado para usar este sistema.<br />
        Si deseas solicitar acceso, por favor contáctanos a <strong>admin@tudominio.com</strong>.
      </p>
    </div>
  )
}
