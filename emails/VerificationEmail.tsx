import { Html, Head, Preview, Row, Heading, Section, Text } from "@react-email/components";

interface VerificationEmailProps{
    username:string; 
    otp:string;
}

export default function verificationEmail({username, otp}:VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
        <Head>
            <title>Verification Code</title>
        </Head>
        <Preview>
            Your Verification code is: {otp}
        </Preview>
        <Section>
            <Row>
            <Heading>
                <h2>Hello {username}</h2>
            </Heading>
            </Row>
            <Row>
                <Text>
                    Thank you for registring with us.
                    please use the following verification code for complete the verification
                </Text>
            </Row>
            <Row>
                <Text>
                    {otp}
                </Text>
            </Row>
        </Section>


      
    </Html>
  );
};
