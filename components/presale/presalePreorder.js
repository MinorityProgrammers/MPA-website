import React, { Fragment } from 'react'
const PresalePreorder = () => {
  function Lock(props) {
    return (
      <>
        <svg
          width='30'
          height='53'
          viewBox='0 0 40 53'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M35 18H32.5V13C32.5 6.1 26.9 0.5 20 0.5C13.1 0.5 7.5 6.1 7.5 13V18H5C2.25 18 0 20.25 0 23V48C0 50.75 2.25 53 5 53H35C37.75 53 40 50.75 40 48V23C40 20.25 37.75 18 35 18ZM12.5 13C12.5 8.85 15.85 5.5 20 5.5C24.15 5.5 27.5 8.85 27.5 13V18H12.5V13ZM35 48H5V23H35V48ZM20 40.5C22.75 40.5 25 38.25 25 35.5C25 32.75 22.75 30.5 20 30.5C17.25 30.5 15 32.75 15 35.5C15 38.25 17.25 40.5 20 40.5Z'
            fill='white'
          />
        </svg>
      </>
    )
  }
  return (
    <Fragment>
      <>
        <div className='preorder'>
          <div className='text-title'>YOUR PREORDER</div>
          <div className='buttons'>
            <div className='top-buttons'>
              <div className='button1'>
                <Lock />{' '}
                <span style={{ fontSize: '2rem' }}>0 $USDC STAKED</span>
              </div>
              <img
                className='chain'
                src='/assets/images/presale/chain.png'
                style={{ width: '100px', height: '100px' }}
              />
              <div className='button2'>
                {' '}
                <span style={{ fontSize: '2rem' }}>
                  {' '}
                  0 $MINORITY RESERVED
                </span>{' '}
                <Lock />
              </div>
            </div>

            <div className='bottom-buttons'>
              <div className='button3' style={{ fontSize: '2rem' }}>
                Buy $MINORITY
              </div>
            </div>
          </div>
        </div>
      </>

      <>
        <div className='minority-amount'>
          <div className='number'>20</div>
          <div className='text'>
            <b className='text-larger'>BILLION MINORITY</b> <br />
            FINITE MAX SUPPLY
          </div>
        </div>
      </>

      <>
        <div className='component3'>
          <div className='some-text'>
            <div className='sometext1'>
              <div className='title-header'>$MINORITY</div>
              The utility token behind the <br />
              App that supports the <br /> careers of Minority <br />{' '}
              Programmers
              <div className='sometext2'>
                <div className='title-header'>$MPA</div>
                airdropped to $MINORITY <br /> holderS for voting power <br />{' '}
                in MPA DAPP
              </div>
            </div>
          </div>
          <div className='image-container'>
            <img src='/assets/images/presale/minorityTOKEN.png' />
          </div>
        </div>
      </>

      <>
        <div className='component-buttons'>
          <div className='audit yellow-btn'>AUDIT</div>
          <div className='whitepaper yellow-btn'>
            <a href='https://minorityprogrammers.com/whitepaper'>WHITEPAPER</a>
          </div>
          <div className='contract yellow-btn'>CONTRACT</div>
        </div>
      </>

      <>
        <div className='tokenamics-chart'>
          <img src='/assets/images/presale/token-chart.png' />
        </div>
      </>

      <>
        <div className='token'>
          <div className='token-title'>TOKEN THAT GIVES BACK</div>
          <div className='aka'>aka “da Secret Sauce”</div>
          <div className='token-text'>
            10% Tax on Each transaction to benefit <br /> ECOSYSTEM & token
            holders
          </div>
        </div>
      </>
      <>
        <div className='image-content'>
          <img src='/assets/images/presale/transactional-burn-tax.png' />
        </div>
      </>

      <>
        <div className='create-account'>
          <div className='account-title'>
            MAKE MPA ACCOUNT & GET AIRDROPPED $MINORITY AFTER PRESALE
          </div>
          <div className='account-text'>
            account holders split 1% of total Supply of $minority EVENLY
          </div>
        </div>
        <div className='create-button'>create account</div>

        <>
          <div className='testimonials'>
            <div className='quote'>
              <div className='quote1'>“</div>
              <div className='quote-text'>What people are saying</div>
              <div className='quote1'>“</div>
            </div>

            <div className='testimonial1'>
              <div className='inner-container'>
                <div className='avatar-image'>
                  <img src='/assets/images/presale/svga group humanwrap move.png' />
                </div>
                <div className='inner-text'>
                  “Minority for a penny? A Majority get many. <br />
                  <div className='user-name'>-wise rapper off the street</div>
                </div>
              </div>
            </div>

            <div className='testimonial2'>
              <div className='inner-container'>
                <div className='inner-text'>
                  I can own a minority on-chain. Wait this isn’t slavery right?{' '}
                  <br />
                  <div className='user-name'>-Concerned citizen</div>
                </div>
                <div className='avatar-image2'>
                  <img src='/assets/images/presale/svga group humanwrap (1).png' />
                </div>
              </div>
            </div>

            <div className='testimonial1'>
              <div className='inner-container'>
                <div className='avatar-image'>
                  <img src='/assets/images/presale/svga group humanwrap.png' />
                </div>
                <div className='inner-text'>
                  I’m a minority, & I be tokin’. I support the movement and what
                  you guys are doing!
                  <br />
                  <div className='user-name'>
                    -Stoner who is confused about career development utility &
                    thinks this is about weed
                  </div>
                </div>
              </div>
            </div>

            <div className='testimonial2'>
              <div className='inner-container'>
                <div className='inner-text'>
                  I can learn, start a community, gain mentorship, attend
                  events, get work & get rewarded for it?
                  <br />
                  <div className='user-name'>
                    -Marketing team taking their job a little bit more seriously
                  </div>
                </div>
                <div className='avatar-image2'>
                  <img src='/assets/images/presale/svga group humanwrap move (2).png' />
                </div>
              </div>
            </div>

            <div className='testimonial1'>
              <div className='inner-container'>
                <div className='avatar-image'>
                  <img src='/assets/images/presale/svga group humanwrap move (1).png' />
                </div>
                <div className='inner-text'>
                  Won’t be the first time $minority made it to the moon.
                  <br />
                  <div className='user-name'>
                    First black MAN on the moon there has never been one
                    actually.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </Fragment>
  )
}
export default PresalePreorder
