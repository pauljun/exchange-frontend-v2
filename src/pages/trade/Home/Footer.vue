<template>
  <div class="footerFAQs">
    <div class="container position-relative">
      <div class="py-3 py-sm-5 blockRow border-bottom pb-0">
        <div class="block logo">
          <p class="mb-lg-2 mb-1">
            <img height="73" src="/landing/img/logo_panazic.png" alt="" />
          </p>
          <div class="font-12 txtContent">
            © 2020 Panazic All rights reserved.
          </div>
          <p>
            Email:
            <a href="mailto:panazic2@gmail.com">panazic2@gmail.com</a>
          </p>
        </div>
        <div class="block pl-sm-4">
          <h4>What we do</h4>
          <ul>
            <li>
              <p>
                <a href="./aboutUs.html" target="_blank">About us</a>
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs" class="txtContent">Digital Asset Exchange</a>
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs" class="txtContent">General Provisions</a>
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs" class="txtContent">Terms of use</a>
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs" class="txtContent">Rights and Obligations</a>
              </p>
            </li>
          </ul>
        </div>
        <div class="block pl-sm-4" style="flex: 0.5 1 0%">
          <h4>Support</h4>
          <ul>
            <li>
              <p>
                <a href="/faqs" class="">FAQs</a>
              </p>
            </li>
            <li>
              <p>
                <a href="#" download="agencyObligations.pdf" target="_blank"
                  >VIP Obligations</a
                >
              </p>
            </li>
            <li>
              <p>
                <a href="./aboutUs.html" target="_blank">Communications</a>
              </p>
            </li>
            <li>
              <p>
                <a href="./aboutUs.html" target="_blank">Dispute Resolution</a>
              </p>
            </li>
            <li>
              <p>
                <a href="./aboutUs.html" target="_blank">Governing Law</a>
              </p>
            </li>
          </ul>
        </div>
        <div class="block pl-sm-4">
          <h4>Security &amp; Privacy</h4>
          <ul>
            <li>
              <p>
                <a href="/faqs/terms-of-use" class="txtContent"
                  >Terms and Conditions</a
                >
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs/risks-disclosure" class="txtContent"
                  >Risks Disclosure</a
                >
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs/liability-and-indemnity" class="txtContent"
                  >Liability and Indemnity</a
                >
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs/liability-and-indemnity" class="txtContent"
                  >Force Majeure</a
                >
              </p>
            </li>
            <li>
              <p>
                <a href="/faqs/liability-and-indemnity" class="txtContent"
                  >Liability of the Parties</a
                >
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="ft-1">
        <div class="block">
          <p class="des1">
            {{ domain }} is authorised by the {{ domain }} TRADING LIMITED and
            regulated under the Judicial Authority of Portugal.
            {{ domain }} TRADING LIMITED (125,268) is incorporated in Portugal
            and has our registered office at: R. Prof. Lima Basto 1099-023,
            Lisbon, Portugal.
          </p>
          <br />
          <p style="text-align: center" class="des2">
            © {{ domain }} 2020 All rights reserved. ‘{{ domain }}’ is a
            trademark of the {{ domain }} TRADING LIMITED.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footerFAQs {
  padding-top: 40px;
  display: block;
  color: #fff;
  background: #080d1f;

  .container {
    position: relative;
    max-width: 1140px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .blockRow {
    display: flex;
    border-color: rgba(139, 141, 150, 0.28);
    padding: 3rem 0 !important;
  }

  .block {
    flex: 1;
    padding-right: 20px;
    position: relative;

    h4 {
      font-size: 16px;
      margin-bottom: 20px;
      margin-top: 8px;
      color: #fff;
    }

    li p {
      margin-bottom: 10px;
      a {
        color: #fff;
        opacity: 0.6;
        line-height: 30px;
      }
    }

    .language {
      display: flex;
      justify-content: flex-end;
      align-content: center;
      button {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.8rem 0.75rem;
        border-radius: 0.25rem;
        color: #fff;
        background: #171b2c;
        display: flex;
        align-content: center;
      }
      span {
        color: #fff;
      }
    }
  }

  .logo {
    margin-bottom: 0.5rem;
    margin-right: 2rem;
    img {
      max-width: 100%;
      font-style: italic;
      vertical-align: middle;
    }
    a {
      color: #fc5f5f;
      text-decoration: none;
    }
  }

  .ft-1 {
    padding: 3rem 0;
  }

  .des1,
  .des2 {
    margin-bottom: 1rem;
  }
}
@media (max-width: 576px) {
  .footerFAQs {
    .blockRow {
      display: unset;
    }

    .logo p img {
      width: 100%;
      object-fit: cover;
      margin-bottom: 10px;
    }

    .block {
      flex: unset;
      .language {
        justify-content: flex-start !important;
        margin-top: 20px;
      }
    }
  }
  .footerFAQs {
    .blockRow {
      display: unset;
    }

    .logo p img {
      width: 100%;
      object-fit: cover;
      margin-bottom: 10px;
    }

    .block {
      flex: unset;
      .language {
        justify-content: flex-start !important;
        margin-top: 20px;
      }
    }
  }
}
</style>

<script>
import config from "@/config";
export default {
  data() {
    return {
      domain: config.domainRealName.toUpperCase(),
    };
  },
};
</script>
