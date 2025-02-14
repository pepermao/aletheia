import {Row, Typography} from "antd";
import colors from "../../styles/colors";
import {useTranslation} from "next-i18next";

const { Title } = Typography;

const CodeOfConduct = () =>{
    const { t } = useTranslation();
    return (
        <Row
            style={{
                color: colors.bluePrimary,
                justifyContent: "center",
                width: "100%",
                fontSize: "1rem",
                letterSpacing: "1px",
                fontWeight: 500,
                padding: "20px"
            }}
        >

            <Title>{t("codeOfConduct:title")}</Title>

            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:introductionSection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:introductionSectionFirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:principlesSection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:principlesSectionFirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:dutiesSection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:dutiesSectionFirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:methodologySection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:methodologySectionFirstParagraph")}
            </Row>
            <ul style={{ width: "100%", marginTop: "15px"}}>
                <li key={1}>{t("claimReviewForm:not-fact")}</li>
                <li key={2}>{t("claimReviewForm:true")}</li>
                <li key={3}>{t("claimReviewForm:true-but")}</li>
                <li key={4}>{t("claimReviewForm:arguable")}</li>
                <li key={5}>{t("claimReviewForm:misleading")}</li>
                <li key={6}>{t("claimReviewForm:false")}</li>
                <li key={7}>{t("claimReviewForm:unsustainable")}</li>
                <li key={8}>{t("claimReviewForm:exaggerated")}</li>
                <li key={9}>{t("claimReviewForm:unverifiable")}</li>
            </ul>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:methodologySectionSecondParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:expectedBehaviorSection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:expectedBehaviorSectionFirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:expectedBehaviorSubSection1")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:expectedBehaviorSubSection1FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:expectedBehaviorSubSection2")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:expectedBehaviorSubSection2FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:unacceptableBehaviorSection")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:unacceptableBehaviorSectionFirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:unacceptableBehaviorSubSection1")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:unacceptableBehaviorSubSection1FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:unacceptableBehaviorSubSection2")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:unacceptableBehaviorSubSection2FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:unacceptableBehaviorSubSection3")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:unacceptableBehaviorSubSection3FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={2}>{t("codeOfConduct:responsibilitiesSection")}</Title>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:responsibilitiesSectionSubSection1")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:responsibilitiesSectionSubSection1FirstParagraph")}
            </Row>
            <Title style={{width: "100%", marginTop: "10px"}} level={3}>{t("codeOfConduct:responsibilitiesSectionSubSection2")}</Title>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:responsibilitiesSectionSubSection2FirstParagraph")}
            </Row>
            <Row style={{width: "100%"}}>
                {t("codeOfConduct:responsibilitiesSectionSubSection2SecondParagraph")}
            </Row>
        </Row>
    )
}

export default CodeOfConduct;
