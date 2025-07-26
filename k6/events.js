import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "10s", target: 50 },
    { duration: "50s", target: 100 },
    { duration: "5m", target: 150 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"],
    http_req_failed: ["rate<0.05"],
    errors: ["rate<0.05"],
  },
};

export default function () {
  const response = http.get("http://localhost:5000/api/home");

  const contentType =
    response.headers["Content-Type"] || response.headers["content-type"];

  errorRate.add(response.status !== 200);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
    "response has body": (r) => r.body.length > 0,
    "content type is JSON": () =>
      contentType && contentType.includes("application/json"),
  });
}

export function setup() {
  console.log("Starting performance test for Home API");
  console.log("Target: http://localhost:5000/api/home");
  console.log(
    "Scenario: 10s ramp-up, to 50 VUs, 50s at 100 Vus, 5m at 150 VUs, 10s ramp-down"
  );
}

export function teardown() {
  console.log("Performance test completed");
}
