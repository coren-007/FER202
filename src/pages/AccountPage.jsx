import { useState } from "react";
import { Container, Card, Button, ProgressBar, Tabs, Tab } from "react-bootstrap";
import AboutForm from "../components/Account/AboutForm";
import AccountForm from "../components/Account/AccountForm";
import AddressForm from "../components/Account/AddressForm";
import { PersonCircle, Lock, GeoAlt } from "react-bootstrap-icons";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("about");

  const getProgress = () => {
    if (activeTab === "about") return 33;
    if (activeTab === "account") return 67;
    if (activeTab === "address") return 100;
    return 0;
  };

  const handleNext = () => {
    if (activeTab === "about") setActiveTab("account");
    else if (activeTab === "account") setActiveTab("address");
  };

  const handlePrevious = () => {
    if (activeTab === "account") setActiveTab("about");
    else if (activeTab === "address") setActiveTab("account");
  };

  const handleFinish = () => {
    alert("Profile completed successfully!");
  };

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Build Your Profile</h3>
        </Card.Header>
        <Card.Body>
          <ProgressBar
            now={getProgress()}
            label={`${getProgress()}%`}
            className="mb-4"
            variant={getProgress() === 100 ? "success" : "info"}
          />

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab
              eventKey="about"
              title={
                <span>
                  <PersonCircle className="me-1" /> About
                </span>
              }
            >
              <AboutForm />
            </Tab>
            <Tab
              eventKey="account"
              title={
                <span>
                  <Lock className="me-1" /> Account
                </span>
              }
            >
              <AccountForm />
            </Tab>
            <Tab
              eventKey="address"
              title={
                <span>
                  <GeoAlt className="me-1" /> Address
                </span>
              }
            >
              <AddressForm />
            </Tab>
          </Tabs>

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={activeTab === "about"}
            >
              Previous
            </Button>
            {activeTab === "address" ? (
              <Button variant="success" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
