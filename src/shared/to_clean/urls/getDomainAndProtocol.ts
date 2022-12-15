import getDomain from 'src/shared/to_clean/urls/getDomain';
import getProtocol from 'src/shared/to_clean/urls/getProtocol';

export default function getDomainAndProtocol(): string {
  return getProtocol() + getDomain();
}
