import {
  getDataSource,
  IPAddressAllowList,
  IPAddressBlockList,
} from '@example/database';
import IPCIDR from 'ip-cidr';
import { isIP, isIPv4 } from 'net';

const CLASS_A_CIDR = new IPCIDR('10.0.0.0/8');
const CLASS_B_CIDR = new IPCIDR('172.16.0.0/12');
const CLASS_C_CIDR = new IPCIDR('192.168.0.0/16');
const CLASS_A_IPV6_CIDR = new IPCIDR('::ffff:10.0.0.0/104');
const CLASS_B_IPV6_CIDR = new IPCIDR('::ffff:172.16.0.0/108');
const CLASS_C_IPV6_CIDR = new IPCIDR('::ffff:192.168.0.0/112');

export const isInternalIp = (ipAddress: string): boolean => {
  if (!isIP(ipAddress)) return false;
  return (
    CLASS_A_CIDR.contains(ipAddress) ||
    CLASS_B_CIDR.contains(ipAddress) ||
    CLASS_C_CIDR.contains(ipAddress) ||
    CLASS_A_IPV6_CIDR.contains(ipAddress) ||
    CLASS_B_IPV6_CIDR.contains(ipAddress) ||
    CLASS_C_IPV6_CIDR.contains(ipAddress)
  );
};

export const isBlockedIp = async (ipAddress: string): Promise<boolean> => {
  if (!isIPv4(ipAddress)) return true;
  const ip = await IPAddressBlockList.findOne({
    where: {
      startIp: ipAddress,
      endIp: ipAddress,
    },
  });
  return ip !== null;
};

export const isAllowedIp = async (ipAddress: string): Promise<boolean> => {
  if (!isIPv4(ipAddress)) return false;
  if (isInternalIp(ipAddress)) return true;
  const ip = await getDataSource()
    .getRepository(IPAddressAllowList)
    .createQueryBuilder('allowed_ips')
    .where('ip >>= :ip', { ip: ipAddress })
    .getOne();
  return ip !== null;
};

export const isRateLimitExemptIp = async (
  ipAddress: string
): Promise<boolean> => {
  if (!isIPv4(ipAddress)) return false;
  const entries = await getDataSource()
    .getRepository(IPAddressAllowList)
    .createQueryBuilder('allowed_ips')
    .where('ip >>= :ip', { ip: ipAddress })
    .getMany();
  return entries.some((entry) => entry.rateLimitFactor !== null);
};

export default { isInternalIp, isBlockedIp, isAllowedIp, isRateLimitExemptIp };
