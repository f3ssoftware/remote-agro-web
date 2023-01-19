import { RootState } from "../.."
import { useSelector } from "react-redux"

export function Report() {

    const { user } = useSelector((state: RootState) => state)

    return (
        <iframe src={user.reportUrl} style={{ width: '100vw', height: '100vh' }} />
    )
}