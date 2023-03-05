import { FC } from "react";
import { useRouter } from "next/router";

const CatalogPage: FC = () => {
    const router = useRouter()
    const {catalog} = router.query

    return <div>Catalog: {catalog}</div>
}

export default CatalogPage
