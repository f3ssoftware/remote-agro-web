import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { asyncGeneratePdf } from "../../../../../stores/commerce.store";
import { _generatePDF } from "../weighingsHelpers";

export function GeneratePdf({ weighing, cultivationsList, silosList, farmsList, contractsList, profile }: { weighing?: any, cultivationsList: any[], silosList?: any[], farmsList?: any[], contractsList?: any[], profile: any }) {
    const dispatch = useDispatch<any>();
    return <Button onClick={() => {
        const html = _generatePDF(weighing, cultivationsList, profile, contractsList, farmsList, silosList);

        // console.log(html);
        dispatch(asyncGeneratePdf(html));
    }}>Gerar Romaneio</Button>
}