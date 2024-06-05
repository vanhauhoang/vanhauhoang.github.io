import { Button } from '../../shared/components/button';
import { Typography } from '../../shared/components/typography';
import { useAppContext } from '../../app/providers/AppContext';
import { useTonConnect } from '../../shared/libs/hooks/useTonConnect';

function shortAddress(address: string): string {
    const firstPart = address.slice(0, 4);
    const lastPart = address.slice(-4);

    return firstPart + '..' + lastPart;
}

export const TonConnectModal = () => {
    const { isMobile } = useAppContext();

    const { userFriendlyAddress, open } = useTonConnect();

    const onDisconnectWallet = () => {
        for (const key in localStorage) {
            if (key.startsWith('ton-connect')) {
                localStorage.removeItem(key);
            }
        }

        window.location.reload();
    };

    return (
        <>
            {userFriendlyAddress ? (
                <div>
                    <Typography>{shortAddress(userFriendlyAddress)}</Typography>
                    <p
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            color: 'white',
                            fontSize: '16px',
                            marginTop: '5px',
                        }}
                        onClick={onDisconnectWallet}
                    >
                        Disconnect
                    </p>
                </div>
            ) : (
                <Button
                    onClick={open}
                    fontFamily={'Montserrat, sans-serif'}
                    height={isMobile ? '42px' : '42px'}
                    fontSize={isMobile ? '16px' : '40px'}
                    stylesForTexts={{ main: { whiteSpace: 'pre-wrap' }, sub: {} }}
                    backgroundColor="#0080bb"
                    text={'Connect wallet'}
                    fontWeight={'normal'}
                    width={'fit-content'}
                    textTransform={'none'}
                    borderRadius="24px"
                />
            )}
        </>
    );
};

