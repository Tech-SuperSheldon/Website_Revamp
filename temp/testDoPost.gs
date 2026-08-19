// Paste ONLY this function at the bottom of your existing Code.gs (below doPost).
// Then: select "testDoPost" in the function dropdown at the top of the editor, click Run,
// and check the Execution log for what it prints.

function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        fullName: "Test User",
        email: "test@example.com",
        mobile: "911234567890",
        country: "India",
        grade: "5",
        subject: "Math",
        createdAt: new Date().toISOString()
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
