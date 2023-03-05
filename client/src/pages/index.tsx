import type { FC } from "react";
import { useQuery } from "react-query";
import { fetcherUserInfo } from "@/shared/api/user.api";
import { CircularProgress } from "@mui/material";
import { User } from "@/entities/user.entity";

const Home: FC = () => {
    const { isLoading, error, data } = useQuery<User>('repoData', fetcherUserInfo)

    if (isLoading) return <CircularProgress />

    return (
        <div>Home page</div>
    )
}

export default Home
