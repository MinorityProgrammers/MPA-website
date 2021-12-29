import React, { useState } from 'react';
import BlackBanner from '../components/BlackBanner';
import Footer from '../components/Footer';
import HomepageNav from '../components/homepage/HomepageNav';
import Layout from '../components/Layout';
import SidebarTwo from '../components/SidebarTwo';
import links from '../contexts/utils/links';

const LegalPage = function () {
  const [open, setOpen] = useState(false);
  const bannerImgLink = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ4NDQ0PDQ0NDQ8NDQ0NFREWFiARFRUYHSggGBolGxUVJz0tJSkrLi4uFx8zRDMtNygtLisBCgoKDg0OGxAQGyslHyUrLS0tMi0tLS0rLy8tLS0tLTYrNS8tLS8tLS0tLy8tNy8tLS0vNS0tLS4tLS0tLS0tL//AABEIALcBEwMBEQACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQYHAwQFAgj/xAA7EAACAQMBBQQHBgUFAQAAAAAAAQIDBBEFEiExQVEGImFxBxMyQpGh8BQjUoGx0TNTYoLBQ3Ki4fEl/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIEBQMBBv/EADARAQACAQIDBgQHAQEBAAAAAAABAgMEERIhMSJBYXGB8DJRkaEFE7HB0eHxI0Ik/9oADAMBAAIRAxEAPwDRoAAAAAAAAABQAAAAAoACgUABQAACgAAACMCAAIAAAQABAIAAAAAAAAAoAAAAAUABQAFAoACgAAFAAAIwIBAAEAAQABAIAAAAAFAAAAAAAAoAABQKAAoFAAAKAAAAIBAAEAgACAAIBAAAABQAAAAAAAAFAAUABQKAAoACgAKAAgEYEAAQCAAIAYEAgFAAAAAAAAAAAFAAAKAAoFAAUAB9AGueHjrjcHu0oHgAyBAIBGBAAEAAGBAIBQAAAAAAAAAABQAACgAKBQAFAAenp2kXFaKrQoynRhUjGbWHnDTaxz3P5lfLqKUnhmeey3p9JkyRxxHZiW6LDs7pusWc503ThdRTezJKL3e7OL5Z58PAo4MPY7M9qPfuWrqtR/02tXes+/cS1D2n0CdnVqJRcfVyxVpN5lSfVdYl3Bm4uVurM1Wm4O1To8HJZUgABAAEAAQAAYEAAAAAAAAAAAAABQAACgUABQAFA+6NOU5KEU3KTwkt5G1orG8pVrNp2h+gvRn2Nqadaeuu5N1KzTjayipU4p8px6vK4cMeaKNpibfmTHh5tCl7Vr+VWfHy8ngdvtJdtVnd2UpUGtl1KO01UoyfBtp96D34l5p700cZ4a23jp94/pdpab059Y+k/wB/6wTUO0FW62FdtylGLpxr4SqNL3KnXH14dppb4ocYyVnsW9yxe6pqE2ljHFY4YfQu0neGXmpw22cZNyAIAAgACAAAEAAAAAAAAAAAAAAAoACgAKBQAHasLfbq0VUUlSnUjtzw0vVKSUmn4LJyy5OGttusR9+53wYZveu8cpn7d7bNt2YlpP2bWLWnRubTaU9mS9ZBZWM7XGL8d6yihE5eGLZOcfP+WtamCbWpi5THd/E/s2JovaKjf0fXwmtuLxKjwlQb4Jrn4Pg/iQvad95cYx7coY922dO4pOjlqu4TlSnHjTisOUpv+Xhb88cdUjjWd5d47EcmidWuIttR2dqMnGTg805pPdKPhx+Jq4aTHKWfqctZ516vOy3xO8Rsp2tNuqnqIAAgEAAQABAAAAAAAAAAAAAAUAAAAUABQKAA3P6PNL07VtNp21WUfW0aTXHFWlUTfeXVb0+uDM/K/wC9952mece+9uRn/wDmpwxvEcp8/wBvB5l3qup6FOrYuW1bybzSqR26NWL9+K5Z8MZ8z2LTtNJeTWu9ckc/lPf/AKx+21+VC6VxZ/dy96jJ5jUi+NPxi/2Ixinba3RK+SLTvV3Na7Uq5irehLEr15upNN1sL/Rx7sE87ufEVxTTeZjlCE3reYrE85+zE73Q503PvZa3pP3s/X5lnFqotEK2fRcO+083lIts5QAACAQABAABgQAAAAAAAAAAAAKAAAAKAAoFAAd/RNXr2FeNehJxlFraim0procsuKuSNp9PB3wZ7Ybbx6x3S2FrGv09Vs6c5YlCGIz3JTtZPju/A3+XQyslstMkVt17vFvYYwZMc2p0nr4Ne6nmlLZ5pvenncaOLa9d2TqN8VtnWsbx0q8K+FJxllprKa4M63xxak1VseaaZIyNp6dYUdXtpXdrU79KTTtl/FpL+ZJ+9J45bksJZw28fLF8U7R6+MeHh7lvYb48sRO/l4T4+PuGH69oUnJuMdmuvajwjVXVeJZ0uqjbaen6Kus0W/OvX9WLNNNppprc09zTNOJ35wxpiYnaQPACAQABAABgQAAAAAAAAAAAAKAAAVAAAFQFAAGByW9xUpNypzcG04yxwlF8muDXmQvSt42tDpjy3xzvSdnxOcpY2nnHDwRKKxHR5bJa3WXzg9Qel2f1u4024hc203GUWtqPuVIfhkjllxVyV2n0n5O2HNbFO8esfNuWhKy160+1WqUK8V99Q3KdOpj68/0ws2K2O/j9p8Y/hv6fUVyV2np948Ja87RaA5SluUK0eDxhVMcn4lrS6vblPRx1mi4+cdWHVISjJxknGUXhp8UzXiYmN4YNqzWdp6vk9eIBAAEAAGBAAAAAAAAAAAAAoAABQAACgUABQAEAoEA9DQdbuNOuI3FtNxlH2o+5Uj+GS6HLNhrlrtPp4O2HNbFbePWPm2/QvLTXrX11HELmKxVpPG1GX19cjAy474r7T1+0+X8Po9PlpkpvHw/ePNguv6E5txmtitDdGXKa6PqWtNquHyV9Xo4yR490sMrUpU5OE04yXFM2K2i0bwwL0tSeGzjJIgEAAAIAAAAAAAAAAAAACgAAACgAKBQKAA5bW2qVpqnShKpN8IwWXjr4Ije9aRvadoTx47ZLcNI3l6cuzlxFd5d7nCCc5LzfBFWNbSZ5NCPwy8R259I5uGWi1ljMZJPnmH7k41NZ9yjbQ7fP7OGtpdSKznPg+78+BKueJcbaS0dHRnFxeJJp9GdomJ6K0xMTtLt6RqteyrRr0JOMlxWe7OP4X4HLPgrmrw2/x1wai+C/FX/W2dO1iz1uhvxTrxXeg334vqup8/mw5MF+19e6f7fS6fNj1FN6+sd8f0w/tJor2tiWNpZ9XV4Z8GXdJqYjp6wp6zScXKfSWGVacoScZLEk8NGxW0WjeGDek0naXweogAABAAAAAAAAAAAAAAUAAAAUABQKAA7+i6XVvbinbUV3pt5k/ZpwXGcvBfsjlmy1xUm0uuDDbLeKVbj0fs7QsqKpUo8cbdRr72u/xSfTw5HzubPfLbis+pwYaYa8NPWXS1avTp9zb542abW5+L/YjXeXWZiGM17SlNt7Lzni5Sb/AFLVc1oVr4q2dSrYSw9mT4tLe5fJ/wCGjvTURv2oV76eduTwb+in3WsSWdnHB+XTy/8AS9S23OGflpFuU9Xjyi08MsxO7OtExO0uS1ualGaqUpOE48GngjfHW9eG0bwniy2xW4qTtLONN7RU7+Co3CUK+MKXCNR/4ZiZ9HbBbjpzh9FptbTU14Lcp99Hma1pe1uaxNezJ8/6WWdNqFbV6Xfr1YvUg4txksNcUakTExvDEtWaztL5PUQCAAAAAAAAAAAAAAAAAFAAUAAAoFA3F6KNBVLT3fyjmd5OcYPmqFOWzhec1L/iZP4hvaYr3Nj8NiKxM98vS7Ual9mgqcf4lbOPCK5mdTHvzlrWvtHJh1LLUW3ltybZO3WXlekK+Xk2ePXJTjhZ6Rb/AD+snkzu9h5+sacqkMx3SilwLGmzzW209FbU4IvG8dWH3kMra5p4l5mzSeezDz13jidQ6qom0008Nb01xTPJjd7EzE7wzXRNWhfQVvcNRrxWIT4etX7mLqdPbBbjp8P6PotJq66iv5eT4v1edrOmSctlrv5xCa4S/pZZ02eNt1bV6WZ5fSWO1abhJxlxTwzRraJjeGPes1naXyeooAAAAAAAAAAAAAAAAoAAAAoACgMgfqbslZxWkaLBJYen2sv7p03Vb+KKeakWtEe++f2X8F5rWZ990fu1v6R6n/1KlNbo0V6uK8kjPvERe0R89vo1aTM46TPfG/1eJRfdXhH9X/0V7dVmvRySjy8VH8iMSk5vDq0vyRBIjh58c/PcevOrB9QpYddcklL54NzFbeKyws9duKHkFxmABNppp4a3prc0x1exMxO8Mz0jtPbytJ0LpbNflcqLlUnHgqUd+zBvnN8EuDzuzr6OKzM0hsYtfx1iMk8+nn47uvX0OFS3rV6tT79bNO1t6UtrPvOc217CjldW+nOdM/DMR3d+7ll03HvMdfDoxitbzh7UWvHky5W8T0Z98Vq9YcRJzAAAAAAAAAAAAAAAAFAAAKAAoAD9OejnU43GhaVVz/Ap/Zqi5xlSk6e/+x7XkVss7TE+Pv7St4I4omI+Xv7wwz0pWThqTre7Xgprz2UmvimZ2aOHLbx2lr6eeLDXw3hjFrwXlH9WVrrVOjlhxT839fEhKcOXPyjn82RSRrZi5N4S/RHvWdnnSN2NaxGMKNWfvSUIebe/5Zl8DbxV+GGDqLdm0/PkxcuM0AAQDZvozrU7yzradU9WpU5urTnNqCSay1ObW6nx3LflLgslDUU3vtPfzifGGvo8n/PeO7lMfOJ6evd5MU7T3lNTqUKUvWLOJVEktp56cluwl0JaXHO3FPohrstYmaV9WOl1lgAAAAAAAAAAAAAAACgAAFAAUABsz0L9p4W9arpdxOMKN9JTt5zeIU71LZUX4Tj3fNLqcc2PiqsafLwWj37+bZfarT4Xls6U8Rr0nL1cpbnnnF+f655NGXmmJjaese/v+vm2sETFt4+GffLy/TylrCrazoNxmnGSzx8FgqcXFK5w8MJHp5I8HI2t/wDu+SR4k8nWtT3eqp729zfV/sXNNg/9WUtTqNuxVi2pXbns008xg22/xT6mtirtzliajJvPDHc6J1V1AgAD6p1ZRzsylHKw9ltZXRnk1iesJ1vanwzMeT4PUAAAAAAAAAAAAAAAAAAAUABQAACgANg9nvSHU2IUL+Tm4pRhcvMpSilhKp1fLa+PUzNXo7W7VPp/DZ0P4hSvYy8vH+Xs3epUbiG1GaknwaacUvMx/wAq9bc4b8Wpeu8bTDHrq8lBvZipPO7fguUxRaOapktw9HkXV/Va704Qjv4PJcx4aR0jdnZs1tuc7PIub1tOMG9/Gb4vyLtMfzZmTN3V+rpYOysoACAAAEAAAAAAAAAAAAAAAAAAAABQAFAAAKAA+qdWUHmEpQfWMnF/I8tWLdY3Sre1OdZmPJyTu60vaqzfnJkYxUjpEOk6jLPW0/Vwtt722/N5JRGzlNpnqh68AAACAAAEAAAAEAoAAAAAAAAAAAAAAACgAKAAAAAAAAAAAIAAAQAAAAAIAAoACAAAAABQAAAAAAAKAAAAAAAAAoACAAAEAAAAAABAAAAAAAAAAABQAAAAAAAAACgAAAAAAAAAEAAAAAABAP/Z';
  const termsText = '';
  return (
    <Layout pageTitle="MPA - Terms & Conditions">
      <HomepageNav open={open} setOpen={setOpen} page="Legal" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <BlackBanner
        title="Terms & Conditions"
        subtitle="Last Updated on July 1st, 2021."
        bannerImgLink={bannerImgLink}
      />
      {/*
          <UnderBannerBody
            text="The following is terms and conditions for the Minority Programmers Association"
          />
      */}
      <iframe
        title="Legal Frame"
        className="legal-frame"
        src="https://docs.google.com/document/d/e/2PACX-1vQzEm54e7WsXqbJSkte_AGY6N0Dr6dCKLAWGld-ulKoBmd98HUimFK9_KjsIC27CckYj9Uv8q9Ts97K/pub?embedded=true"
      />
      <Footer />
    </Layout>
  );
};
export default LegalPage;
