import { Container, Box, Heading, Text } from "@chakra-ui/layout";
import { Link, ListItem, Spacer, UnorderedList } from "@chakra-ui/react";

const Privacy = () => {

  return (
    <>
<Container maxW={{ sm: "xl", md: "3xl", lg: "5xl", xl: "8xl" }}>
        <Box mt="24px">
          <Heading color="#000"
            as="h1"
            fontSize={{
              base: "26px",
              sm: "36px",
              lg: "42px",
              xl: "56px",
            }}
            mb={{ base: "10px", lg: "48px" }}
          >
            Privacy Policy
          </Heading>
          <Box>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
               1. Introduction
          </Heading>
       
           <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={3} >
           Ibanera LLC, a limited liability company, established in Wyoming with the legal entity code 2020-000936644 and with registered address at 2120 Carey Avenue, Cheyenne, WY 82001, United States. Ibanera LLC is registered with FinCEN as a Money Service Business.
          </Text>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={3} >
           Ibanera Pte Ltd and Ibanera LLC are both Financial Institutions, regulated respectively by the Monetary Authority of Singapore and FinCEN. Both of these institutions formulate a group of Ibanera.
          </Text>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={3} >
          Ibanera Pte Ltd, legal code: 201804993R registered address: 62 Ubi Road 1 #03-08 Oxley Bizhub 2, Singapore 408734 Singapore, holder of a Major Payment Institution license by the Monetary Authority of Singapore.
          </Text>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={3} >
          Ibanera provides a variety of financial services, which are regulated according to the jurisdiction of each financial institution. Ibanera is considered as a Data Controller for the purpose of this Privacy Policy.  When providing our services, IBANERA collects and uses personal data (hereinafter – <strong>the Personal Data</strong>). Therefore, IBANERA is obligated to use and process your Personal Data only in accordance with this privacy policy (hereinafter – <strong>the Privacy Policy</strong>), as well as, applicable legislation, including the General Data Protection Regulation (2016/679) (hereinafter – <strong>GDPR</strong>) and other applicable legal acts on protection of personal data. This Privacy Policy provides basic rules for collecting, storing, processing and retention of your Personal Data and other information relating to you, as well as, the scope of processed Personal Data, the purposes, sources, recipients and other important aspects of data processing in using IBANERA services. When writing <strong>‘you’</strong>, IBANERA means you as – a potential, existing and/or former client, our client’s employee or other parties, such as beneficial owners, authorized representatives.<Spacer />
Please note that in case you provide IBANERA with the information about any person other than yourself, your employees, counterparties, advisers or suppliers, you must ensure that they understand how their information will be used.

          </Text>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={3} >
          You can contact IBANERA by writing an e-mail to  <Link href="mailto:info@ibanera.com" color="blue.500" textDecoration="underline">
        info@ibanera.com
      </Link>{" "} or post us at our mailing office address at 78 SW 7th St 7-118, Miami, FL 33130, United States.
          </Text>
        
          </Box>
      
          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
               2. Principles of Processing Personal Data
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          The principles we follow in order to comply with the need to protect your Personal Data are as follows:
          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}><strong>principle of legality, fairness and transparency</strong> – means that the Personal Data with respect to you is processed in a lawful, honest and transparent way;</ListItem>
      <ListItem mb={2}><strong>purpose limitation principle</strong> – means that the Personal Data is collected for specified, clearly defined and legitimate purposes and shall not be further processed in a way that is incompatible with those purposes;</ListItem>
      <ListItem mb={2}><strong> data reduction principle</strong> – means that the Personal Data must be adequate, appropriate and is only necessary for the purposes for which it is processed;</ListItem>
      <ListItem mb={2}><strong>	accuracy principle </strong> – means that the Personal Data must be accurate and, if necessary, updated. All reasonable steps must be taken to ensure that Personal Data which is not accurate in relation to the purposes for which it is processed shall be immediately erased or corrected;</ListItem>
      <ListItem mb={2}><strong>principle of limitation of the length of the storage </strong> –means that the Personal Data shall be kept in such a way that your identity can be determined for no longer than is necessary for the purposes for which the Personal Data is processed;</ListItem>
      <ListItem mb={2}><strong>integrity and confidentiality principle </strong> –means that the Personal Data shall be managed by applying appropriate technical or organizational measures in a way, which would ensure the proper security of the Personal Data, including the protection from an unauthorized processing or processing of an unauthorized data against accidental loss, destruction or damage.</ListItem>
    </UnorderedList>
    <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
    Your Personal Data is considered as confidential information and may only be disclosed to third parties in accordance with the rules and procedure provided in this Privacy Policy and the applicable legal acts.
          </Text> 
        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
             3. Information Collected by Ibanera
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          The categories of Personal Data that IBANERA may collect about you are as follows:
          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}><strong>Basic personal data </strong> – name, surname, job title etc.</ListItem>
      <ListItem mb={2}><strong>Identification information and other background verification data</strong> – your and / or your representative’s, ultimate beneficiary owners of legal entities (natural persons who directly or indirectly own or control a legal unit with a sufficient number of shares or voting rights, including through bearer share management) name, surname, personal identification code, date of birth, nationality, address, gender, a copy of passports or ID card, passport’s or ID card’s number, issuance place and date, evidence of beneficial ownership and / or the source of funds, number of shares held, voting rights or share capital part, visually scanned or photographed image of your face or image that you provide through a mobile application or camera, video and audio recordings for identification, telephone conversations to comply with client due diligence/”know your client”/anti-money laundering laws and collected as part of our client acceptance and ongoing monitoring procedures.</ListItem>
      <ListItem mb={2}><strong>Information related to legal requirements data</strong> – data resulting from enquiries made by the authorities, data that enables to perform anti-money laundering requirements and ensure the compliance with international sanctions, including the purpose of the business relationship and whether customer is a politically exposed person and other data that is required to be processed by the Company in order to comply with the legal obligation to “know your client”.</ListItem>
     
      <ListItem mb={2}><strong>	Financial transaction data </strong> – beneficiary details, date, time, amount and currency which was used, name/IP address of sender and receiver; accounts number (e.g. IBAN), details of debit cards and credit cards if relevant, amount of transactions, income, currency, location, etc.</ListItem>

      <ListItem mb={2}><strong>	Contact Data </strong> – registered/actual place of residence, phone number, e–mail address etc.</ListItem>

    </UnorderedList>

        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
            4. Purposes and Legal Basis for Personal Data Processing
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          IBANERA collects personal data for the purposes listed below:
          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}><strong>Conclusion of the contract or for performance of measures at your request prior to the conclusion of the contract</strong> <Spacer/> For this purpose, IBANERA may process your Basic Personal Data, Identification data and other background verification data, Contact Data, and other Personal Data (in order to identify the possibility of providing services). The legal basis for the processing of the above-mentioned data are the following: to take necessary steps before the conclusion of the contract, to fulfil legitimate interests and/or fulfil the legal obligations applicable to IBANERA.</ListItem>
 
      <ListItem mb={2}><strong>For the fulfilment of a contract concluded with you, including but not limited to provision of services of issuance, distribution and redemption of e-money and provision of payment services</strong> <Spacer/>For this purpose, IBANERA may process your Basic Personal Data, Identification data and other background verification data, Financial transaction data, information related to legal requirements, Contact Data and other Personal Data provided to IBANERA by or on behalf of the client or generated by IBANERA in the course of providing services.
The legal basis for the processing of the above-mentioned data is the following: performance of a contract, fulfilling legitimate interests and/or compliance with legal obligations applicable to IBANERA.
</ListItem>


      <ListItem mb={2}><strong>To comply with legal obligations (e.g. implementation of the obligations under the Law on Money Laundering and Terrorist Financing Prevention of the Republic of Lithuania and other fraud and crime prevention purposes) and risk management obligations</strong> <Spacer/>For this purpose, IBANERA may process your Basic Personal Data, Identification and other background verification Data, Financial transaction Data, Information which is related to legal requirements, Contact Information and other Personal Data provided to us by or on behalf of you or generated by us in the course of providing services.
The legal basis for the processing of the above-mentioned data is the following: fulfilling legitimate interests and/or compliance with legal obligations applicable to IBANERA.
</ListItem>
<ListItem mb={2}><strong>	For the fulfilment of a contract concluded with you, including but not limited to provision of services of issuance, distribution and redemption of e-money and provision of payment services</strong> <Spacer/>For this purpose, IBANERA may process your Basic Personal Data, Identification data and other background verification data, Financial transaction data, information related to legal requirements, Contact Data and other Personal Data provided to IBANERA by or on behalf of the client or generated by IBANERA in the course of providing services.<Spacer/>
The legal basis for the processing of the above-mentioned data is the following: performance of a contract, fulfilling legitimate interests and/or compliance with legal obligations applicable to IBANERA.

</ListItem>

      <ListItem mb={2}><strong>To provide an answer when you contact IBANERA through the website or other communication measures</strong> <Spacer/>For this purpose, IBANERA may process your Basic Personal Data, Contact Data and other Personal Data provided to us by or on behalf of you.
The legal basis for the processing of the above-mentioned data is the following: your consent, fulfilling legitimate interests of IBANERA.
</ListItem>


      <ListItem mb={2}><strong>Contract performance means:</strong> processing your Personal Data where it is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract. </ListItem>
      <ListItem mb={2}><strong>Legitimate interest means:</strong> the interest of IBANERA as a business in conducting and managing IBANERA services to enable IBANERA to provide to you and offer the most secure experience. </ListItem>
      <ListItem mb={2}><strong>Legal obligation means:</strong>  processing your Personal Data where it is necessary for compliance with a legal or regulatory obligation that IBANERA is subject to.</ListItem>
    </UnorderedList>

        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
            5. How Ibanera Obtains your Personal Data
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          IBANERA collects information that you provide directly to IBANERA. For example, when becoming a new client (if you have entered into or seek to enter into an agreement with IBANERA). IBANERA also collects information which you provide to IBANERA, such as messages that you have sent to IBANERA, by access and use of the website by setting up an account with IBANERA, when you subscribe to electronic publications (e.g. newsletters).<Spacer />
Personal Data that IBANERA may collect from third parties:

          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}>when it is provided to IBANERA by a third party which is connected to you and/or is dealing with IBANERA, for example, business partners, subcontractors, service providers, merchant etc.;</ListItem>
      <ListItem mb={2}>third party sources, for example, register held by governmental agencies or where IBANERA collects information about you to assist with “know your client” check-ups as part of IBANERA client acceptance procedures, such as sanctions list, politically exposed persons list, etc.;</ListItem>
      <ListItem mb={2}>from banks and/or other finance institutions in case the Personal Data is received while executing payment transactions;</ListItem>
     
      <ListItem mb={2}>from publicly available sources – IBANERA may, for example, use sources to help IBANERA keep your contact details that IBANERA already possesses accurate and up to date or for professional networking purposes or for providing IBANERA services;</ListItem>


    </UnorderedList>
    <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
    From other entities which IBANERA collaborates with. <Spacer />
In order to make your identity verification, we are using Jumio and Refinitiv solution. Jumio and Refinitiv are used for comparing live photograph data or video record of yourself and your ID card/passport in order to comply with client due diligence / ”know your client” / anti-money laundering laws and other legal requirements. The result of the face recognition (match or mismatch) will be retained how long it is necessary to carry out identity verification and for the period required by anti-money laundering laws.
</Text>
<Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
<strong>IBANERA conducts your identity verification using Jumio and Refinitiv solution on a consent basis.</strong>
If you do not feel comfortable with this method, you may contact us by email   <Link href="mailto:info@ibanera.com" color="blue.500" textDecoration="underline">
        info@ibanera.com
      </Link>{" "} for alternative way to identify yourself. <Link href="https://www.jumio.com/legal-information/privacy-notices/jumio-corp-privacy-policy-for-online-services/" color="blue.500" textDecoration="underline">
Jumio’s privacy policy
      </Link>.


          </Text>
        
          </Box>


          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
           6. Sharing of Personal Data
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          IBANERA may transfer your Personal Data to the following categories of recipients:

          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}>State Tax Inspectorate, other state and municipal institutions, bodies, organizations, and other public administration entities;</ListItem>
      <ListItem mb={2}>Financial Crime Investigation Service, other pre-trial investigation bodies, courts, bailiffs, notaries;</ListItem>
      <ListItem mb={2}>IBANERA business partners, agents or intermediaries who are a necessary part of the provision of IBANERA products and services;</ListItem>
     
      <ListItem mb={2}>commercial banks, other financial institutions;</ListItem>
      <ListItem mb={2}>	law, finance, tax, business management, personnel administration, accounting advisors, etc.;</ListItem>
      <ListItem mb={2}>service providers who make your identity verification by using their IT solutions;</ListItem>
      <ListItem mb={2}>Companies providing services for money laundering, politically exposed persons and terrorist financing check-up and other fraud and crime prevention purposes and / or companies providing similar services;</ListItem>
      <ListItem mb={2}>	external service providers (that provide such services as, for example, system development and/or improvement, audit services);</ListItem>
      <ListItem mb={2}>commercial banks, other financial institutions;</ListItem>
      <ListItem mb={2}>	beneficiaries of transaction funds receiving the information in payment statements together with the funds of the transaction;</ListItem>
      <ListItem mb={2}>	other persons with whom IBANERA intends to conclude or has concluded a contract (s);</ListItem>
      <ListItem mb={2}>other persons who are required access to the data in order to exercise their legal obligations, by a legitimate interest or with the consent of the shareholders or the beneficiary.</ListItem>

    </UnorderedList>
    
        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
          7. International Transfers of Personal Data
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          As IBANERA provides international services, your Personal Data may be transferred and processed outside the United States (hereinafter <strong>- USA</strong> ).<Spacer/>
The transfer of Personal Data may be considered as needed in such situations as, e.g.:

          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}>in order to conclude the contract between you and IBANERA and/or to fulfil the obligations under such contract;</ListItem>
      <ListItem mb={2}>in cases indicated in laws and regulations for protection of IBANERA lawful interests, e.g.</ListItem>
      <ListItem mb={2}>in order to bring proceedings in court/other governmental bodies;</ListItem>
     
      <ListItem mb={2}>in order to fulfil legal requirements or</ListItem>
      <ListItem mb={2}>	in order to realize public interest.</ListItem>
      </UnorderedList>
      <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
      In case your Personal Data is transferred outside the USA, IBANERA will take all steps to ensure that your data is treated securely and in accordance with this Privacy Policy and IBANERA will ensure that it is protected and transferred in a manner consistent with the legal requirements applicable to the Personal Data. <Spacer />
This can be done in a number of different ways, for example:

</Text>
<UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
      <ListItem mb={2}>	the country to which IBANERA sends the Personal Data, a territory or one or more specified sectors within that third country, or the international organization is approved by the European Commission as having an adequate level of protection;</ListItem>
      <ListItem mb={2}>	the Data recipient which is in the third country has signed standard data protection clauses which are approved by the European Commission;</ListItem>
      <ListItem mb={2}>	if the Data recipient is located in the US, it may be a certified member of the EU–US Privacy Shield scheme;</ListItem>
      <ListItem mb={2}>special permission has been obtained from a supervisory authority.

</ListItem>
  

    </UnorderedList>
    <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
    IBANERA may transfer Personal Data to a third country by taking other measures if it ensures appropriate safeguards as indicated in the GDPR
          </Text>
        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
        8. Retention Terms of Personal Data Processing
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          IBANERA will keep your Personal Data for as long as it is needed for the purposes for which your data was collected and processed but no longer than it is required by the applicable laws and regulations. This means that IBANERA stores your data for as long as it is necessary for providing services and as required by retention requirements in laws and regulations. <Spacer />
If the legislation of the Republic of Lithuania does not provide any period of retention of Personal Data, this period shall be determined by IBANERA, taking into account the legitimate purpose of the data retention, the legal basis and the principles of lawful processing of Personal Data as well as following the principle of storage limitation. <Spacer />
The terms of data retention of the Personal Data for the purposes of the processing of the Personal Data as specified in this Privacy Policy are as follows:

          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}>as long as your consent remains in force, if there are no other legal requirements which shall be fulfilled with regard to the Personal Data processing;</ListItem>
      <ListItem mb={2}>in case of the conclusion and execution of contracts – until the contract concluded between you and IBANERA remains in force and up to 10 years after the relationship between you and IBANERA has ended;</ListItem>
      <ListItem mb={2}>the Personal Data collected for the implementation of the obligations under the Law on Money Laundering and Terrorist Financing Prevention shall be stored in accordance with the Law on Prevention of Money Laundering and Terrorist Financing of the Republic of Lithuania up to 8 (eight) years. The retention period may be extended for a period not exceeding 2 (two) years, provided there is a reasoned request from a competent authority.</ListItem>
     
      </UnorderedList>
      <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
      In the cases when the terms of data keeping are indicated in the legislative regulations, the legislative regulations are applied.

<Spacer />
Your Personal Data might be stored longer if:

</Text>
<UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
      <ListItem mb={2}>	it is necessary in order for IBANERA to defend itself against claims, demands or action and exercise its rights;</ListItem>
      <ListItem mb={2}>	there is a reasonable suspicion of an unlawful act that is being investigated;</ListItem>
      <ListItem mb={2}>	your Personal Data is necessary for the proper resolution of a dispute / complaint;</ListItem>
     <ListItem mb={2}>  under other statutory grounds.</ListItem>

    </UnorderedList>
    
        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
             9. Your Rights in Relation to the Personal Data
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          You as a data subject have rights in respect of Personal Data IBANERA holds on you. Under certain circumstances and in accordance with EU or other applicable data protection laws, you may have the right to:
          </Text>
          <UnorderedList styleType="disc" ms={{base:3, md:'8'}}>
          
      <ListItem mb={2}><strong>get familiar with your Personal Data and how it is processed </strong> – you have the right to obtain information about which Personal Data about you that IBANERA processes. Your right to access may, however, be restricted by legislation, protection of other persons’ privacy and consideration for the Company’s business concept and business practices. The Company’s know-how, business secrets as well as internal assessments and material may restrict your right of access;</ListItem>
      <ListItem mb={2}><strong> 	demand rectifying incorrect or incomplete data</strong> – if it turns out that IBANERA processes Personal Data about you that is inaccurate, you have the right to request a rectification of the Personal Data. You can also request to have incomplete Personal Data about you completed;</ListItem>
      <ListItem mb={2}><strong> 	erasing your Personal Data</strong>  – you have the right to have any or all of your Personal Data erased. In certain cases, IBANERA cannot erase all of your Personal Data. In such case this would be due to the fact that IBANERA needs to store your Personal Data due to a contractual relationship or law;</ListItem>
      <ListItem mb={2}><strong>		restricting the processing of your Personal Data </strong>  – you have the right to demand that IBANERA’s processing of your Personal Data be restricted for a period of time. This can pertain, for example, to a situation where you believe data about you is inaccurate and IBANERA needs to verify it. It can also pertain to a situation where you object to processing that IBANERA bases on a legitimate interest. In such case IBANERA must verify if IBANERA grounds override yours;</ListItem>
      <ListItem mb={2}><strong> 	transfer your Personal Data  </strong>to another data controller or provide directly to you in a convenient format (NOTE: applicable to Personal Data which is provided by you and which is processed by automated means on the basis of consent or on the basis of conclusion and performance of the contract);</ListItem>
      <ListItem mb={2}><strong>object to any processing based on the legitimate interests </strong>  ground unless IBANERA reasons for undertaking that processing outweigh any prejudice to your data protection rights;</ListItem>
      <ListItem mb={2}><strong>to withdraw your consent</strong>  so that IBANERA stops that particular processing when processing is based on consent. However, such consent withdrawal does not affect the lawfulness of processing based on consent before its withdrawal;</ListItem>
      <ListItem mb={2}><strong>not to be subject to a decision based solely on automated processing;</strong></ListItem>
      <ListItem mb={2}><strong>	lodge an appeal to the office of the State Data Protection Inspectorate</strong>  – if you have an objection about how IBANERA has processed your Personal Data, you can turn to the supervisory authority concerned.</ListItem>
    </UnorderedList>
    <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
    IBANERA will exercise your rights only after receives your written request to exercise a particular right indicated above and only after confirming the validity of your identity. The written request shall be submitted to IBANERA by sending it to the address of our registered office by ordinary mail, e-mail  <Link href="mailto:privacy@ibanera.com" color="blue.500" textDecoration="underline">
    privacy@ibanera.com
      </Link>{" "} or submitting such request via your account.
Your requests shall be fulfilled or fulfilment of your requests shall be refused by specifying the reasons for such refusal within 30 (thirty) calendar days from the date of submission of the request meeting IBANERA’s internal rules and GDPR. The afore-mentioned time frame may be extended for 30 (thirty) calendar days by giving a prior notice to you if the request is related to a great scope of Personal Data or other simultaneously examined requests. A response to you will be provided in a form of your choosing as the requester.

          </Text> 
        
          </Box>

          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
            fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
             10. The Right to Lodge a Complaint
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          You can submit a complaint to IBANERA if you reasonably believe that processing of Personal Data related to you is performed in violation of the applicable legal requirements.<Spacer />
You can file a complaint regarding the Personal Data in the same manner as specified above the section “Your rights in relation to the Personal Data”. It must include your name, surname, contact details, relevant information, which would indicate why you reasonably believe that the processing of the data related to you is performed in violation of the applicable legal requirements. You can add other available evidence that justifies the need for such a complaint.<Spacer />
In case you consider that IBANERA’s processing of your Personal Data is processed in a way that violates your rights and legitimate interests stipulated by applicable legislation, you may also lodge a complaint with a supervisory authority – the State Data Protection Inspectorate.


          </Text>
          </Box>
          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
              11. Changes to the Privacy Policy
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          IBANERA regularly reviews this Privacy Policy and reserves the right to modify it at any time in accordance with applicable laws and regulations. Any changes and clarifications will take effect immediately upon their publication on the website: <Link href="https://www.ibanera.com" color="blue.500" textDecoration="underline">
          www.ibanera.com
      </Link>{" "} Please review this Privacy Policy from time to time to stay updated on any changes.
          </Text>
          </Box>
          <Box  mt={{ base: "20px", lg: "38px" }}>
          <Heading color="#000"
            as="h3"
             fontSize={{
              base: "16px",
              md: "24px",
              lg: "36px",
            }}
            mb={{ base: "10px", lg: "28px" }}
            mt={4}
          >
             12. Cookies
          </Heading>
          <Text color="#393F59" fontSize={{ base: "14px", md: "16px" }} mb={2} >
          If you access IBANERA information or services through the website, you should be aware that IBANERA uses different cookies.<Spacer />For more information on how to control cookies and browser settings or how to delete cookies, please read IBANERA Cookies Policy available on the website www.ibanera.com <Link href="https://www.ibanera.com" color="blue.500" textDecoration="underline">
          www.ibanera.com
      </Link>{" "}.
          </Text>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Privacy;
