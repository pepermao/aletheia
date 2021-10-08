import { NextPage } from "next";
import PersonalityView from "../components/Personality/PersonalityView";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PersonalityPage: NextPage<{ personality: any, href: any }> = ({ personality, href }) => {
    return (
        <PersonalityView personality={personality} href={href} />
    )
}

export async function getServerSideProps({ query, locale, req }) {
    locale = locale || "en";
    console.log(query.personality);
    return {
        props: {
            ...(await serverSideTranslations(locale)),
            // Nextjs have problems with client re-hydration for some serialized objects
            // This is a hack until a better solution https://github.com/vercel/next.js/issues/11993
            personality: JSON.parse(JSON.stringify(query.personality)),
            // stats: JSON.parse(JSON.stringify(query.stats)),
            href: req.protocol + '://' + req.get('host') + req.originalUrl
        },
    };
}
export default PersonalityPage;
