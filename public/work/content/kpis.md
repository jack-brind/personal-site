<!-- markdownlint-disable MD033 -->

## Context

Recruitment is a numbers-driven industry, where KPIs play a critical role in measuring individual, team, and organisational performance. These metrics influence promotions, pay reviews, and commissions, making them a powerful motivator. By providing clarity and focus on targets, KPIs help individuals understand expectations, driving both personal and business success.

## Problem

While KPI data _was available_, it was scattered across different areas of the product, making it difficult to access and track. There was no dedicated space for users to monitor performance metrics efficiently, leading to frustration and inefficiencies. As a result, users had to rely on workarounds, such as exporting multiple reports and manually compiling them in spreadsheets—an error-prone and time-consuming process.

This inefficiency had a direct business impact, increasing customer frustration, contributing to churn, lost deals, and revenue risk. The lack of an integrated KPI solution left a potential revenue gap of up to £720k ($930k) ARR—nearly $1M in lost annual revenue.

## Goals

### User Goals

- Remove user frustration
- Provide an efficient and flexible way to track metrics
- Users should be able to drill down into KPIs
- Metrics should be visually clear and detailed

### Business Goals

- Protect revenue
- Reduce the risk of customer churn
- Increase stickiness for customers
- Remove barriers for sales

## Research

We had a good amount of feedback on this problem already which came primarily from speaking to customers and async feedback, but also from the sales team. In addition, I analysed some competitors as well as similar stand-alone tools in the market.

This provided a good amount of insight, but I had some gaps in knowledge and assumptions to validate so we also conducted a survey to customers to dig a little deeper into some of the key themes identified initially. The results of the survey provided some clarity.

<img src="/work/content/research.png" alt="Research insights" class="markdown-content__image lightbox-image" />

<div class="banner">
  <div class="banner-icon insight-icon">💡</div>
  <div class="banner-content">
    <div class="banner-header">Research insights</div>
    <div class="banner-text"> 
      <p>
        One interesting emerging themes that we identified during from the survey and subsequent follow ups with respondents was the need for targetless KPIs. Based on customer feedback and feedback from sales, our assumption was that KPIs were intrinsically target-based. However, it was clear that customers also wanted to track metrics without targets. This was key insight that we would not have considered prior to the survey.
      </p>
    </div>
  </div>
</div>

## Solution

Once the research phase was complete, I collaborated with the engineering, product and QA teams to outline the initial scope for the project. The scope consisted of:

- a total of 25 configurable metrics to track
- granular configurability for nuanced metrics
- historical tracking and auditing when targets are updated
- a dashboard for users to keep track of their performance
- drill down capabilities to dig deeper into the data
- a report for managers business leaders to report on performance

For users, KPIs should be represented in a clear way and have the ability to drill down and report on any metric to see the activity that contributed to the metric.

<figure class="markdown-figure">
  <img src="/work/content/configuration.png" alt="Settings area where KPIs are configured and managed" class="markdown-content__image--app lightbox-image" />
  <figcaption>KPI configuration</figcaption>
</figure>

<figure class="markdown-figure">
  <img src="/work/content/config.png" alt="Image description" class="markdown-content__image--app lightbox-image" />
  <figcaption>KPI configuration modal</figcaption>
</figure>

It was also crucial that KPIs were communicated to the user well. After many iterations of the KPI card, I settled on a final design that struck the right balance between information density and visual weight.

<figure class="markdown-figure">
  <img src="/work/content/kpi-anatomy.png" alt="KPI widget card anatomy" class="markdown-content__image lightbox-image sunken-image" />
  <figcaption>KPI widget card anatomy in hover state</figcaption>
</figure>

<img src="/work/content/dashboard.png" alt="KPI dashboard" class="markdown-content__image--app lightbox-image" />

## Outcome

- Plugged a revenue hole of £750k with new business
- Uplift in sales resulting in +£150k ARR within 6 months
- Increasing chances of retaining customers and reducing churn

## Future

KPIs in recruitment is a vast field with a lot of space left to play. Future considerations include:

- More metrics
- Private KPIs
- Projections
- Comparisons
- Composite KPIs

---

**_There were many different challenges and edge cases that needed to be addressed during this project. If you'd like to know more, please get in touch._**

**This is a short breakdown of the project and there was a lot more work that went on behind the scenes. Want to know more?** `<button>Conact me</button>`.

<!-- Modal HTML -->
<div id="imageModal" class="modal">
  <span class="close" onclick="closeImageModal()">&times;</span>
  <img class="modal-content" id="modalImage">
</div>

<style>
/* Modal styles */
.modal-image {
  cursor: pointer;
  transition: opacity 0.3s;
}

.modal-image:hover {
  opacity: 0.8;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  max-width: 90%;
  max-height: 90%;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>

<script>
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.style.display = "block";
  modalImg.src = src;
}

function closeImageModal() {
  document.getElementById("imageModal").style.display = "none";
}
</script>
