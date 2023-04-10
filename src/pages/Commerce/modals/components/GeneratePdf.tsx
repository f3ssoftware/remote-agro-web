import { Button } from "react-bootstrap";
import { _generatePDF } from "./weighingsHelpers";
import { useDispatch } from "react-redux";
import { asyncGeneratePdf } from "../../../../stores/commerce.store";

export function GeneratePdf({ weighing, cultivationsList, silosList, farmsList, contractsList, profile }: { weighing: any, cultivationsList: any[], silosList: any[], farmsList: any[], contractsList?: any[], profile: any }) {
    const dispatch = useDispatch<any>();
    return <Button onClick={() => {
        const html = _generatePDF(weighing, cultivationsList, silosList, farmsList, profile, contractsList);

        dispatch(asyncGeneratePdf(html));
    }}>Gerar Pdf</Button>
}