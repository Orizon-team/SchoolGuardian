export default function Layout({children}:{children:React.ReactNode})
{
    return(
        <section>
            Esto es parte del layout de los dashboard
            {children}
        </section>
    );
}