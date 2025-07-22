import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  const isBudgetAlert = type === "budget-alert";

  return (
    <Html>
      <Head />
      <Preview>
        {isBudgetAlert
          ? "You've exceeded your budget!"
          : `Your ${data?.month ?? "Monthly"} Financial Report`}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>FinTrack</Heading>
          <Text style={styles.text}>Hi {userName},</Text>

          {isBudgetAlert ? (
            <>
              <Text style={styles.text}>
                You have exceeded your budget by ${data?.exceededBy ?? 0} this month.
              </Text>
              <Text style={styles.text}>
                Please review your expenses and adjust accordingly.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.text}>
                Here’s your financial summary for {data?.month ?? "this month"}:
              </Text>
              <Section style={styles.statBox}>
                <Text style={styles.label}>Total Income:</Text>
                <Text>${data?.stats?.totalIncome ?? 0}</Text>
              </Section>
              <Section style={styles.statBox}>
                <Text style={styles.label}>Total Expenses:</Text>
                <Text>${data?.stats?.totalExpenses ?? 0}</Text>
              </Section>
              <Section style={styles.statBox}>
                <Text style={styles.label}>Net Savings:</Text>
                <Text>
                  $
                  {(data?.stats?.totalIncome ?? 0) -
                    (data?.stats?.totalExpenses ?? 0)}
                </Text>
              </Section>
              <Text style={{ ...styles.text, marginTop: 20 }}>Spending by Category:</Text>
              {Object.entries(data?.stats?.byCategory ?? {}).map(
                ([category, amount], index) => (
                  <Section key={index} style={styles.categoryRow}>
                    <Text>
                      {category}: ${amount}
                    </Text>
                  </Section>
                )
              )}
            </>
          )}

          <Text style={styles.footer}>Thanks for using FinTrack!</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f7",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "4px",
  },
  heading: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#333333",
    lineHeight: "1.5",
  },
  statBox: {
    padding: "10px 0",
    borderBottom: "1px solid #e4e4e4",
  },
  label: {
    fontWeight: "bold",
    color: "#111111",
  },
  categoryRow: {
    padding: "4px 0",
  },
  footer: {
    fontSize: "14px",
    color: "#888888",
    marginTop: "30px",
  },
};

