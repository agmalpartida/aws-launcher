const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const destDir = `${os.homedir()}/aws-launcher`;

urlsFixing = {
  "AWS-Management-Console": "https://console.aws.amazon.com",
  "Lightsail": "https://lightsail.aws.amazon.com/ls/webapp/create/instance",
  "QuickSight": "https://us-east-1.quicksight.aws.amazon.com/sn/console",
  "Budgets": "https://console.aws.amazon.com/billing",
  "Cost-Explorer": "https://console.aws.amazon.com/billing",
  "Macie": "https://aws.amazon.com/macie/",
  "Personal-Health-Dashboard": "https://phd.aws.amazon.com/phd/home",
  "Global-Accelerator": "https://aws.amazon.com/global-accelerator/",
  "AppStream": "https://aws.amazon.com/appstream2/",
  "Aurora": "https://aws.amazon.com/rds/aurora/",
  "Autoscaling": "https://aws.amazon.com/autoscaling/",
  "LoadBalancing": "https://aws.amazon.com/loadbalancing/",
  "DevOps": "https://aws.amazon.com/devops",
  "Security": "https://aws.amazon.com/security",
  "Compliance": "https://aws.amazon.com/compliance",
  "Big-Data": "https://aws.amazon.com/big-data",
  "Fargate": "https://aws.amazon.com/fargate",
  "Serverless": "https://aws.amazon.com/serverless",
  "Architecure-Center": "https://aws.amazon.com/architecture/",
  "Well-Architected": "https://aws.amazon.com/architecture/well-architected/",
  "Well-Architected-Tool": "https://aws.amazon.com/well-architected-tool/",
  "Security-Identity-and-Compliance": "https://aws.amazon.com/products/security/",
  "Single-Sign-On": "https://aws.amazon.com/single-sign-on/",
  "SSO": "https://aws.amazon.com/single-sign-on/",
  "Security-Hub": "https://aws.amazon.com/security-hub/",
  "VPN": "https://aws.amazon.com/vpn/",
  "Developer-Center": "https://aws.amazon.com/developer/",
  "Global-Insfracture": "https://aws.amazon.com/about-aws/global-infrastructure",
  "Regions-And-Zones": "https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/",
  "Lambda@Edge": "https://aws.amazon.com/lambda/edge/",
  "EventBridge": "https://console.aws.amazon.com/events/",
  "Event-Driven-Architecture": "https://aws.amazon.com/event-driven-architecture/"
}

namespacesFixing = {
  "Certificate-Manager": "acm",
  "Service-Quotas": "servicequotas",
  "Service-Catalog": "servicecatalog",
  "Managed-Services": "managedservices",
  "API-Gateway": "apigateway",
  "ElasticCache": "elasticache",
  "EMR": "elasticmapreduce",
  "Shield": "waf",
  "Snowball": "importexport",
  "StepFunctions": "states",
  "WorkDocs": "zocalo",
  "X-Ray": "xray",
  "Cost-Explorer": "billing",
  "Budgets": "billing",
  "Secrets-Manager": "secretsmanager",
  "License-Manager": "license-manager",
  "Firewall-Manager": "waf",
  "Resource-Access-Manager": "ram",
}

// Create destination folder
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Create shortcuts
files = fs.readdirSync('icons');
files.forEach((file, index) => {
  console.log(`Found file ${file}`)
  file = file.replace(/\.[^/.]+$/, "");
  console.log(`Compiling ${file}`);
  const namespace = namespacesFixing[file] || file.toLowerCase();
  const url = urlsFixing[file] || `https://console.aws.amazon.com/${namespace}/home`;
  fs.writeFileSync(`${destDir}/${file}.url`, `[InternetShortcut]\nURL=${url}`);
  exec(`fileicon set ${destDir}/${file}.url icons/${file}.png`, function (error, stdout, stderr) {
    console.log(error || stdout);
    if (!error) {
      exec(`SetFile -a E ${destDir}/${file}.url`, function (error, stdout, stderr) {
        if (!error && index === files.length - 1) {
          exec(`open ${destDir}`);
        }
      });
    }
  });
})
