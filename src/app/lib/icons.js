import { FaFire, FaLock, FaBug, FaExclamationCircle, /* ... */ } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineGlobal,  /* ... */ } from 'react-icons/ai';
import { FaMicroscope, FaRobot, FaHandRock, FaMemory, /* ... */ } from 'react-icons/fa';
import { AiOutlineDesktop,  AiFillSafetyCertificate, AiOutlineSearch, /* ... */ } from 'react-icons/ai';
import { FaMask, FaTag, FaMapSigns, /* ... */ } from 'react-icons/fa';
import { AiOutlineTerminal, AiOutlineUserSecret, AiOutlineCloudUploadAlt, /* ... */ } from 'react-icons/ai';
import { FaBoxOpen, FaUserLock, FaVirus, FaGlobe, /* ... */ } from 'react-icons/fa';
import { AiOutlineUserCheck, AiOutlineMicroscope, AiOutlineRobot, /* ... */ } from 'react-icons/ai';
import { FaArrowsAltH, FaDatabase, FaSearchPlus, FaArrowRight , FaUserCheck , /* ... */ } from 'react-icons/fa';
import { AiOutlineApi, AiOutlineKey, AiOutlineWifi, /* ... */ } from 'react-icons/ai';
import { FaShieldAlt, FaEye, FaTimes, FaUserSecret, FaFingerprint , FaCloudUploadAlt, FaCodeBranch, FaFileSignature, FaCogs, FaKeyboard, FaIdBadge , FaBinoculars , FaUndo , FaExclamationTriangle , FaShare, FaKey, FaObjectUngroup,  /* ... */ } from 'react-icons/fa';
import { BsFingerprint } from 'react-icons/bs';
// import {FaUserSecret} from "react-icons/fa";
import { TbMicroscope , TbFileCertificate } from "react-icons/tb";
import {HiOutlineShieldCheck} from "react-icons/hi";






export  const cybersecurityIcons = {
    "Default": <FaShieldAlt />,
    "Firewall": <FaFire />,
    "Encryption": <FaLock />,
    "Malware": <FaBug />,
    "Vulnerability": <FaExclamationCircle />,
    "Intrusion Detection": <AiOutlineEye />,
    "Network Security": <AiOutlineGlobal />,
    "Authentication": <BsFingerprint />,
    "Application Security Testing": <FaMicroscope />,
    "Automated Security Testing": <FaRobot />,
    "Behavioral Analysis": <FaUserCheck />,
    "Biometric Authentication": <FaFingerprint />,
    "Bot Detection": <FaRobot />,
    "Brute Force Attack": <FaHandRock />,
    "Buffer Overflow": <FaMemory />,
    "Business Continuity Planning": <FaShieldAlt />,
    "Cloud Access Security Broker (CASB)": <FaCloudUploadAlt />,
    "Code Review": <FaCodeBranch />,
    "Dark Web Monitoring": <FaMask />,
    "Data Classification": <FaTag />,
    "Data Loss Prevention": <FaDatabase />,
    "Deception Technology": <FaMapSigns />,
    "Digital Certificate": <AiFillSafetyCertificate />,
    "Digital Signature": <FaFileSignature />,
    "Endpoint Detection and Response (EDR)": <AiOutlineDesktop />,
    "Ethical Hacking": <FaUserSecret />,
    "File Integrity Monitoring (FIM)": <FaBoxOpen />,
    "Firewall Configuration": <FaCogs />,
    "Fuzz Testing": <TbMicroscope />,
    "Honeypot": <FaBoxOpen />,
    "Incident Analysis": <AiOutlineSearch />,
    "Insider Threat": <FaUserSecret />,
    "Integrity Verification": <HiOutlineShieldCheck />,
    "Internet of Things (IoT) Security": <AiOutlineApi />,
    "Keylogger": <FaKeyboard />,
    "Man-in-the-Middle (MitM) Attack": <FaArrowsAltH />,
    "Network Forensics": <FaSearchPlus />,
    "Man-in-the-Middle (MitM) Attack": <FaArrowsAltH />,
    "Network Forensics": <FaSearchPlus />,
    "Outbound Firewall": <FaArrowRight />,
    "Database Security": <FaDatabase />,
    "Digital Identity": <FaIdBadge />,
    "Biometric Authentication": <FaFingerprint />,
    "Threat Hunting": <FaBinoculars />,
    "Security Monitoring": <FaEye />,
    "Adaptive Security": <AiOutlineApi />,
    "Public Key Infrastructure (PKI)": <AiOutlineKey />,
    "Wireless Network Security": <AiOutlineWifi />,
    "Security Posture": <FaShieldAlt />,
    "Integrity Verification": <HiOutlineShieldCheck />,
    "Incident Recovery": <FaUndo />,
    "Security Incident Management": <FaExclamationTriangle />,
    "Data Breach": <FaTimes />,
    "Insider Threat": <FaUserSecret />,
    "Threat Intelligence Sharing": <FaShare />,
    "Security Token": <FaKey />,
    "Firewall Configuration": <FaCogs />,
    "Network Segmentation": <FaObjectUngroup />,
    "Wireless Network Security": <AiOutlineWifi />,
    "Internet of Things (IoT) Security": <AiOutlineApi />,
    "Certificate Authority": <TbFileCertificate />,
    // ... add more terms and icons
};


import { AiOutlineUser } from "react-icons/ai"

const OutlineUser = (props) => {
    return <AiOutlineUser {...props} />
}


export { OutlineUser };