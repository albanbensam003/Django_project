$(document).ready(function () {
    var hitCount = 0;
    function diff_minutes(dt2, dt1) {
        var res = Math.abs(dt2 - dt1) / 1000;
        return Math.floor(res / 60) % 60;
    }

    /* Code Start: Exit intent*/
    var objExitIntentValues = $.trim($("#hdnLoggedInUserId").val()).split('~');
    if ($.trim($("#hdnCartSessionIdExitIntent").val()) == "") {
        $.ajax({
            url: urlBase + "/Repair/GetExitIntentThumbBanner",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            success: function (result) {
                if (result) {
                    $("#anchorExitIntentModal").attr("href", $.trim(result.Link));
                    $("#imgExitIntentModal").attr("src", urlBase + "/ItemImages/Banner/Thumb/" + $.trim(result.BannerImage));
                    if (result.Link) {
                        $("#hdnIsValidExitIntentPopUp").val("true");
                    }
                }
            }
        });
    }
    else {
        if (eval(objExitIntentValues[0]) == true && $.trim(objExitIntentValues[3]) != "" && $.trim(objExitIntentValues[4]) != "") {
            $("#anchorExitIntentModal").attr("href", $.trim(objExitIntentValues[3]));
            $("#imgExitIntentModal").attr("src", urlBase + "/ItemImages/Banner/Thumb/" + $.trim(objExitIntentValues[4]));
            $("#hdnIsValidExitIntentPopUp").val("true");
        }
        else if (eval(objExitIntentValues[0]) == false && $.trim(objExitIntentValues[3]) != "" && $.trim(objExitIntentValues[4]) != "") {
            var dEArr = objExitIntentValues[1].split('-');
            var tEArr = objExitIntentValues[2].split(':');
            var objExitTime = new Date(parseInt(dEArr[0]), parseInt(dEArr[1]) - 1, parseInt(dEArr[2]), parseInt(tEArr[0]), parseInt(tEArr[1]), parseInt(tEArr[2]), 0);
            var objNowTime = new Date();
            var exitDateTimeDiff = diff_minutes(objNowTime, objExitTime);
            if (exitDateTimeDiff >= 30 && objNowTime.getDate() == objExitTime.getDate()) {
                $("#anchorExitIntentModal").attr("href", $.trim(objExitIntentValues[3]));
                $("#imgExitIntentModal").attr("src", urlBase + "/ItemImages/Banner/Thumb/" + $.trim(objExitIntentValues[4]));
                $("#hdnIsValidExitIntentPopUp").val("true");
                var exitIntentVal = $.trim($("#hdnLoggedInUserId").val());
            }
        }
    }
    function getThumbBannerForExitIntent() {
        if ($.trim($("#hdnIsValidExitIntentPopUp").val()).toLowerCase() == "true") {
            $("#modalExitIntent").modal("show");
        }
    }
    $(document).on("mouseleave", function (e) {
        if (e.clientY < 0) {
            getThumbBannerForExitIntent();
        }
    });
    $(".closeExitIntentModelPopUp").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlBase + "/User/SaveExitIntentUserData",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{}",
            success: function (rows) {
                if (rows == "ExitBanner_Disabled") {
                    $("#hdnIsValidExitIntentPopUp").val("false");
                }
            }
        });
    });

    /* End code: Exit intent*/

    $("#password").keypress(function (e) {
        if (e.which == 13) {
            UserLogin();
        }
    });
    $("#UserName").keypress(function (e) {
        if (e.which == 13) {
            UserLogin();
        }
    });


    $("#btnUserLogin").click(function (e) {
        e.preventDefault();
        $("UserName").on("keypress", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });
        $("password").on("keypress", function (e) {
            if (e.which === 32 && !this.value.length)
                e.preventDefault();
        });

        if ($("#UserName").val() == "") {
            $("#UserMeg").html("Please Enter UserName");
            $("#UserMeg").focus();
            return false;
        } else {
            $("#UserMeg").html("");
        }
        if ($("#password").val() == "") {
            $("#passwordMeg").html("Please Enter Password");
            return false;
        } else {
            $("#passwordMeg").html("");
        }

        if ($.trim($("#hdnMobileStatus").val()).toLowerCase() == "false") {
            if ($.trim($("#txtmobileno").val()) == "") {
                ShowPageMessage("Please enter mobile no. to update", "red");
                $("#txtmobileno").focus();
                return false;
            }
            else {
                if ($.trim($("#txtmobileno").val()).length < 10) {
                    ShowPageMessage("Please enter 10 digits mobile no. to update", "red");
                    $("#txtmobileno").focus();
                    return false;
                }
            }
            if ($.trim($("#txtNewOTPNo").val()) == "") {
                ShowPageMessage("Please enter OTP to update mobile no.", "red");
                $("#txtNewOTPNo").focus();
                $("#txtNewOTPNo").show()
                return false;
            }
            else {
                if ($.trim($("#txtNewOTPNo").val()).length < 6) {
                    ShowPageMessage("The otp must be 6 digits long", "red");
                    $("#txtNewOTPNo").focus();
                    $("#txtNewOTPNo").show()
                    return false;
                }
            }
        }

        ////if ($("#UserName").val() != "" || $("#password").val() == "") {
        ////    $("#bvc").hide();
        ////    $("#resettingpassword").show();
        ////}
        var data = {};
        if ($.trim($("#hdnPageName").val()) != "" && ($.trim($("#hdnPageName").val()).toLowerCase().indexOf("order") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("/cartcheckout") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("wishlist") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("ratingwithoutpurchasing") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().includes("productinfo/comparedevices"))) {//<<== added code for compare work, pawan roopwal,03-Sep-2018
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnPageName").val()),
            }
        } else if ($.trim($("#hdnProductReviewRedirectUrl").val()) != "") {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnProductReviewRedirectUrl").val()),
            }
        }
        else if ($.trim($("#hdnMobileStatus").val()).toLowerCase() == "false") {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnProductReviewRedirectUrl").val()),
                "otp": $.trim($("#txtNewOTPNo").val()),
            }
        }
        else {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "isOTP": $("#chkOTP").prop("checked")
            }
        }
        if ($("#chkRememberMe").prop("checked") == true) {
            $.cookie("username", $.trim($("#UserName").val())), {
                expires: 9999
            };
            $.cookie("password", $.trim($("#password").val()), {
                expires: 9999
            });
        }


        if ($.trim($("#hdnMobileStatus").val()).toLowerCase() == "false") {
            $.ajax({
                url: urlBase + '/User/CheckUsersValidationsDetails',
                ////url: urlBase + '/User/UserLogin',
                type: "POST",
                data: "{'emailId':'" + $.trim($("#UserName").val()) + "','mobileNo':'" + $.trim($("#txtmobileno").val()) + "'}",
                ////data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (objDetailValidation) {

                    if ($.trim(objDetailValidation) != "") {
                        ShowPageMessage($.trim(objDetailValidation), "red");
                        return false;
                    }
                    else {

                        $.ajax({
                            url: urlBase + '/User/UserLogin',
                            type: "POST",
                            data: JSON.stringify(data),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (objLogin) {

                                if (objLogin.Success) {
                                    if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("checkoutrepaircart") > 0) {
                                        return CallCheckOutRepairCart(objLogin.RepairIssueIDs);
                                    } else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/customerorders") > 0 || $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/wishlist") > 0) {
                                        window.location.href = urlBase + "/" + objLogin.RequestedPageToRedirect;
                                    }
                                    /*bolow code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018*/
                                    else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("buybacksummary") > 0) {
                                        window.location.href = urlBase + "/" + $.trim(objLogin.RequestedPageToRedirect);
                                    }
                                    /*Above code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018 ends here*/
                                    else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("customerreviews?pid=") > 0) {
                                        window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                                    } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartcheckout") > 0) {
                                        window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                                    } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ratingwithoutpurchasing") > 0) {
                                        var reviewH = globalReviewHandler;

                                        saveCustomerReviewsWithoutPurchase($.trim(reviewH.txtReviewsSubjectWithoutPurchase.val()), $.trim(reviewH.txtReviewCommentsWithoutPurchase.val()), parseInt(reviewH.hidProductID.val()), parseInt(reviewH.hiMatrixID.val()), $.trim(reviewH.hidSKU.val()), $.trim(reviewH.hidProductName.val()), globalStarRatings, 0, "Pending", reviewH);
                                        window.location.reload();
                                    }
                                    /*compare work, pawan roopwal,03-Sep-2018*/
                                    else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" &&
                                        $.trim(objLogin.RequestedPageToRedirect).toLowerCase().includes("productinfo/comparedevices")) {
                                        window.location.href = $.trim(objLogin.RequestedPageToRedirect);
                                    }
                                    /*compare work ends, pawan roopwal,03-Sep-2018*/

                                    /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 20-Nov-2017 */
                                    else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartdetail") && ($.trim(objLogin.Message) != "")) {
                                        if ($.trim(objLogin.Message) != "") {

                                            ShowPageMessage($.trim(objLogin.Message), "red");
                                            //alert($.trim(objLogin.Message));
                                            window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                                        }
                                        else {
                                            ShowPageMessage("Unable to proceed please try again", "red");
                                        }
                                        ////window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                                    }
                                    /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 20-Nov-2017 ends here */
                                    else {
                                        window.location.reload();
                                    }
                                }
                                else if ($.trim(objLogin).toLowerCase() == "otp send on mobile") {
                                    $("#bvc").hide();
                                    $("#resettingpassword").show();
                                    $("#divOTP").show();

                                }
                                else if ($.trim(objLogin).toLowerCase() == "your password null or empty") {
                                    $("#bvc").hide();
                                    $("#resettingpassword").show();
                                    $("#divOTP").hide();
                                    $("#spnotp").hide();
                                }
                                else if ($.trim(objLogin) == "Invalid OTP!") {
                                    ShowPageMessage("Invalid OTP!", "red");
                                }
                                else {
                                    $("#divLoginMessage").show();
                                    //$("#divLoginMessage").html(objLogin);
                                    ShowLoginMessage(objLogin);
                                }
                            },
                            error: function () {

                                $("#divLoginMessage").html("Error");
                            }
                        });
                    }
                },
                error: function (xhr, statusText, error) {

                }
            });
        }
        else {

            $.ajax({
                url: urlBase + '/User/UserLogin',
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                success: function (objLogin) {

                    if (objLogin.Success) {
                        if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("checkoutrepaircart") > 0) {
                            return CallCheckOutRepairCart(objLogin.RepairIssueIDs);
                        }
                        /*below code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018*/
                        else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("buybacksummary") > 0) {
                            window.location.href = urlBase + "/" + $.trim(objLogin.RequestedPageToRedirect);
                        }
                        /*Above code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018 ends here*/
                        else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/customerorders") > 0 || $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/wishlist") > 0) {
                            window.location.href = urlBase + "/" + objLogin.RequestedPageToRedirect;
                        } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("customerreviews?pid=") > 0) {
                            window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                        } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartcheckout") > 0) {
                            window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                        } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ratingwithoutpurchasing") > 0) {
                            var reviewH = globalReviewHandler;

                            saveCustomerReviewsWithoutPurchase($.trim(reviewH.txtReviewsSubjectWithoutPurchase.val()), $.trim(reviewH.txtReviewCommentsWithoutPurchase.val()), parseInt(reviewH.hidProductID.val()), parseInt(reviewH.hiMatrixID.val()), $.trim(reviewH.hidSKU.val()), $.trim(reviewH.hidProductName.val()), globalStarRatings, 0, "Pending", reviewH);
                            window.location.reload();
                        }
                        /*compare work, pawan roopwal,03-Sep-2018*/
                        else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" &&
                            $.trim(objLogin.RequestedPageToRedirect).toLowerCase().includes("productinfo/comparedevices")) {
                            window.location.href = $.trim(objLogin.RequestedPageToRedirect);
                        }
                        /*compare work ends, pawan roopwal,03-Sep-2018*/

                        /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 20-Nov-2017 */
                        else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartdetail") && ($.trim(objLogin.Message) != "")) {
                            if ($.trim(objLogin.Message) != "") {

                                ShowPageMessage($.trim(objLogin.Message), "red");
                                //alert($.trim(objLogin.Message));
                                window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                            }
                            else {
                                ShowPageMessage("Unable to proceed please try again", "red");
                            }
                            ////window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                        }
                        /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 20-Nov-2017 ends here */
                        else {
                            window.location.reload();
                        }
                    }
                    else if ($.trim(objLogin).toLowerCase() == "otp send on mobile") {
                        $("#bvc").hide();
                        $("#resettingpassword").show();
                        $("#divOTP").show();
                        $("#spnotp").hide();

                    }
                    else if ($.trim(objLogin).toLowerCase() == "your password null or empty") {
                        $("#bvc").hide();
                        $("#resettingpassword").show();
                        $("#divOTP").hide();
                        $("#spnotp").hide();
                    }
                    else if ($.trim(objLogin) == "Invalid OTP!") {
                        ShowPageMessage("Invalid OTP!", "red");
                    }
                    else {
                        $("#divLoginMessage").show();
                        //$("#divLoginMessage").html(objLogin);
                        ShowLoginMessage(objLogin);
                    }
                },
                error: function () {

                    $("#divLoginMessage").html("Error");
                }
            });
        }
    });

    function UserLogin() {
        if ($("#UserName").val() == "") {
            $("#UserMeg").html("Please Enter Username");
            $("#UserMeg").focus();
            return false;
        } else {
            $("#UserMeg").html("");
        }
        if ($("#password").val() == "") {
            $("#passwordMeg").html("Please enter Password");
            return false;
        } else {
            $("#passwordMeg").html("");

        }
        if ($.trim($("#hdnMobileStatus").val()).toLowerCase() == "false") {
            if ($.trim($("#txtmobileno").val()) == "") {
                ShowPageMessage("Please enter mobile no. to update", "red");
                $("#txtmobileno").focus();
                return false;
            }
            else {
                if ($.trim($("#txtmobileno").val()).length < 10) {
                    ShowPageMessage("Please enter 10 digits mobile no. to update", "red");
                    $("#txtmobileno").focus();
                    return false;
                }
            }
            if ($.trim($("#txtNewOTPNo").val()) == "") {
                ShowPageMessage("Please enter OTP to update mobile no.", "red");
                $("#txtNewOTPNo").focus();
                return false;
            }
        }
        var data = {};
        if ($.trim($("#hdnPageName").val()) != "" && ($.trim($("#hdnPageName").val()).toLowerCase().indexOf("order") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("/cartcheckout") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("wishlist") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().indexOf("ratingwithoutpurchasing") > 0 || $.trim($("#hdnPageName").val()).toLowerCase().includes("productinfo/comparedevices"))) {//<<== added code for compare work, pawan roopwal,03-Sep-2018
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnPageName").val())
            }
        } else if ($.trim($("#hdnProductReviewRedirectUrl").val()) != "") {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnProductReviewRedirectUrl").val())
            }
        }
        else if ($.trim($("#hdnMobileStatus").val()).toLowerCase() == "false") {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val()),
                "requestedPage": $.trim($("#hdnProductReviewRedirectUrl").val()),
                "otp": $.trim($("#txtNewOTPNo").val()),
            }
        }
        else {
            data = {
                "userName": $.trim($("#UserName").val()),
                "password": $.trim($("#password").val())
            }
        }
        if ($("#chkRememberMe").prop("checked") == true) {
            $.cookie("username", $.trim($("#UserName").val())), {
                expires: 9999
            };
            $.cookie("password", $.trim($("#password").val()), {
                expires: 9999
            });
        }
        $.ajax({
            url: '/User/UserLogin',
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function (objLogin) {
                if (objLogin.Success) {
                    if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("checkoutrepaircart") > 0) {
                        return CallCheckOutRepairCart(objLogin.RepairIssueIDs);
                    }
                    /*blow code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018*/
                    else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("buybacksummary") > 0) {
                        window.location.href = urlBase + "/" + $.trim(objLogin.RequestedPageToRedirect);
                    }
                    /*Above code has been added by Pawan Roopwal for redirecting user directly to buy back summary page after sign up, 25-March-2018 ends here*/
                    else if (objLogin.RequestedPageToRedirect != null && objLogin.RequestedPageToRedirect != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/customerorders") > 0 || $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ser/wishlist") > 0) {
                        window.location.href = urlBase + "/" + objLogin.RequestedPageToRedirect;
                    } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("customerreviews?pid=") > 0) {
                        window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                    } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartcheckout") > 0) {
                        window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                    } else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("ratingwithoutpurchasing") > 0) {
                        var reviewH = globalReviewHandler;
                        saveCustomerReviewsWithoutPurchase($.trim(reviewH.txtReviewsSubjectWithoutPurchase.val()), $.trim(reviewH.txtReviewCommentsWithoutPurchase.val()), parseInt(reviewH.hidProductID.val()), parseInt(reviewH.hiMatrixID.val()), $.trim(reviewH.hidSKU.val()), $.trim(reviewH.hidProductName.val()), globalStarRatings, 0, "Pending", reviewH);
                        window.location.reload();
                    }

                    /*compare work, pawan roopwal,03-Sep-2018*/
                    else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" &&
                        $.trim(objLogin.RequestedPageToRedirect).toLowerCase().includes("productinfo/comparedevices")) {
                        window.location.href = $.trim(objLogin.RequestedPageToRedirect);
                    }
                    /*compare work ends, pawan roopwal,03-Sep-2018*/
                    /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 21-Nov-2017 */
                    else if (objLogin.RequestedPageToRedirect != null && $.trim(objLogin.RequestedPageToRedirect) != "" && $.trim(objLogin.RequestedPageToRedirect).toLowerCase().indexOf("/cartdetail") && ($.trim(objLogin.Message) != "")) {
                        if ($.trim(objLogin.Message) != "") {

                            ShowPageMessage($.trim(objLogin.Message), "red");
                            //alert($.trim(objLogin.Message));
                            window.location.href = urlBase + $.trim(objLogin.RequestedPageToRedirect);
                        }
                        else {
                            ShowPageMessage("Unable to proceed please try again", "red");
                        }
                    }
                    /* Version: 1.3, Following else if condition is begin added for validating if there is any discount or coupon applied exists in invalid conditions, bug fixing, pawan roopwal, 21-Nov-2017 ends here */
                    else {
                        window.location.reload();
                    }
                }
                else if ($.trim(objLogin).toLowerCase() == "OTP send on mobile") {
                    $("#bvc").hide();
                    $("#resettingpassword").show();
                    $("#divOTP").show();

                }
                else if ($.trim(objLogin).toLowerCase() == "your password null or empty") {
                    $("#bvc").hide();
                    $("#resettingpassword").show();
                    $("#divOTP").hide();
                    $("#spnotp").hide();
                }
                else if ($.trim(objLogin) == "Invalid OTP!") {
                    ShowPageMessage("Invalid OTP!", "red");
                }
                else {
                    $("#divLoginMessage").html(objLogin);
                }
            },
            error: function () {
                $("#divLoginMessage").html("Error");
            }
        });
    }

    $("#chkOTP").click(function () {
        if ($(this).prop("checked") == true) {
            var userName = $("#UserName").val();
            if (userName == "") {
                ShowPageMessage("Enter mobile no.", "red");
                return false;
            }
            if (parseInt(hitCount) <= 3) {
                if (confirm("Are you sure want to login via OTP")) {
                    $.ajax({
                        url: '/User/UserLoginOTP',
                        type: 'post',
                        dataType: 'json',
                        data: { mobileNo: userName },
                        success: function (data) {
                            ShowPageMessage(data, "green");
                            $("#password").val("");
                            hitCount = parseInt(hitCount + 1);
                        },
                        error: function (xhr) {
                        }
                    });
                }
                else {
                    return false;
                }
            }
            else {
                ShowPageMessage("OTP already sent to your number", "red");
            }
            $("#chkOTP").attr("disabled", true);
            $("#password").attr("placeholder", "OTP");
            $("#lnkCloseOTP").show();
        }
        else if ($(this).prop("checked") == false) {
            $("#password").attr("placeholder", "Password");
            $("#lnkCloseOTP").hide();
        }

    });

    $("#lnkResendLoginOTP").click(function (e) {
        e.preventDefault();
        if ($("#chkOTP").prop("checked") == true) {
            var userName = $("#UserName").val();
            if (userName == "") {
                ShowPageMessage("Enter mobile no.", "red");
                return false;
            }
            if (parseInt(hitCount) <= 3) {
                if (confirm("Are you sure want to login via OTP")) {
                    $.ajax({
                        url: '/User/UserLoginOTP',
                        type: 'post',
                        dataType: 'json',
                        data: { mobileNo: userName },
                        success: function (data) {
                            ShowPageMessage(data, "green");
                            $("#password").val("");
                            hitCount = parseInt(hitCount + 1);
                        },
                        error: function (xhr) {
                        }
                    });
                }
                else {
                    return false;
                }
            }
            else {
                ShowPageMessage("OTP already sent to your number", "red");
            }
            $("#chkOTP").attr("disabled", true);
            $("#password").attr("placeholder", "OTP");
        }
        else if ($(this).prop("checked") == false) {
            $("#password").attr("placeholder", "Password");
        }
    });

    $("#lnkCloseOTP").click(function (e) {
        e.preventDefault();
        $("#chkOTP").attr("disabled", false);
        $("#chkOTP").prop("checked", false);
        $("#password").attr("placeholder", "Password");
        $("#lnkCloseOTP").hide();
    });
});

function CallCheckOutRepairCart(issuesIds) {
    $.ajax({
        url: "/Repair/CheckOutRepairCart",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: "{'issuesIds':'" + $.trim(issuesIds) + "', 'loginStatus': true , 'couponCode':'', 'remarks':''}",
        success: function (result) {
            if ($.trim(result.Message).toLowerCase().contains("success") == true) {
                $("#cartSessionIdPayment").val($.trim(result.Id));
                window.location.href = urlBase + "/Repair/Payment";
            } else {
                ShowPageMessage(result.Message);
            }
        },
        error: function (xhr, status, error) {
            ShowPageMessage(xhr.statusText);
        }
    });
}

//function CallSaveItemsInCart(objProdct) {
//    $.ajax({
//        url: "/Cart/SaveItemsInCart",
//        type: "POST",
//        dataType: "JSON",
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify(objProdct),
//        success: function (data) {
//            var setColor = "red";
//            if (data.CartItemsCount != null || data.CartItemsCount > 0) {
//                $("#lblCartCount").html(data.CartItemsCount);
//                $("#lblCartCount2").html(data.CartItemsCount);
//                setColor = "green";
//                if (data.Message == "This item is Out Of Stock" || data.Message == "This item is already added in Cart") {
//                    setColor = "red";
//                }
//            }
//            if (data == "This item is Out Of Stock") {
//                ShowPageMessage(data, setColor);
//            }
//            if (data == "This item is Out Of Stock") {
//                ShowPageMessage(data, setColor);
//            } else {
//                ShowPageMessage(data.Message, setColor);
//            }
//            hideProgressBar();
//        },
//        error: function (ex) {
//            ShowPageMessage(ex.statusText, "red");
//        },
//    });
//}
//start naren13jan update addto cart script
function CallSaveItemsInCart(objProdct) {
    $.ajax({
        url: "/Cart/SaveItemsInCart",
        type: "POST",
        dataType: "JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(objProdct),
        success: function (result) {
            debugger;
            var val1 = result.Data.param1;
            var val2 = result.Data.param2;
            var val3 = result.Data.param3;
            var setColor = "red";
            if (val1.CartItemsCount != null || val1.CartItemsCount > 0) {
                $("#lblCartCount").html(val1.CartItemsCount);
                $("#dvCartList").html(val3);
                $("#spnTotalAmount").html(val2);
                setColor = "green";
                if (val1.Message == "This item is Out Of Stock" || val1.Message == "This item is already added in Cart"
                    || val1.Message == "You Can't place an order by login as a retailer") {
                    setColor = "red";
                }
            }///
            if (val1 == "This item is Out Of Stock") {
                ShowPageMessage(val1, setColor);
            }
            if (val1 == "This item is Out Of Stock") {
                ShowPageMessage(val1, setColor);
            } else {
                ShowPageMessage(val1.Message, setColor);
            }

            //$("#DvScriptAddtoCart").html(val2);
            hideProgressBar();

        },
        error: function (ex) {
            ShowPageMessage(ex.statusText, "red");
        },
    });
}
//end


function CallSaveWishList(objWhishList) {

    $.ajax({
        url: urlBase + '/cart/WishList',
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: "{'objWishtList':" + JSON.stringify(objWhishList) + "}",
        success: function (result) {
            if (result == "Item(s) added in wishlist successfully") {
                var wishListCount = parseInt($("#lblWishListCount").html());
                wishListCount = wishListCount + 1;
                $("#lblWishListCount").html(wishListCount);
                ShowPageMessage(result, "geen");
            } else if (result == "This item is already added in wishlist") {
                ShowPageMessage(result, "red");
            } else if (result == "This item is Out Of Stock") {
                ShowPageMessage(result, "red");
            } else if (result == "Your are not login") {
                $($("#logInSignUpMaster").data("target")).modal("show");
            }
        },
        error: function (ex) {
            ShowPageMessage(ex.statusText, "red");
        }
    });
}

function ShowPageMessage(messageTxt, msgbgcolor) {
    if (msgbgcolor == "red")
        msgbgcolor = "#e22121";
    else
        msgbgcolor = "#43bb33";
    $("#divPageMessage").html(messageTxt);
    $("#divPageMessage").show().delay(3000).fadeOut(300, function () {
        $("#divPageMessage").hide();
    });
    $("#divPageMessage").css("background-color", msgbgcolor);
    return false;
}

function ShowImageModalPopup(imgURL, productName) {
    $("#imgPopup").css("background-image", "url(" + imgURL + ")");
    $("#divPopupImage").dialog({
        modal: true,
        height: 470,
        title: productName,
        width: 390,
        draggable: false,
        resizable: false,
        dialogClass: 'fixed-dialog',
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
}

function showProgressBar(hoverCtrl) {
    $("#loading_k").remove();
    $(".loadingDiv_k").remove();
    $(hoverCtrl).append("<div id='loading_k'></div>").append("<div class='loadingDiv_k'></div>");
}

function hideProgressBar() {
    $("#loading_k").remove();
    $(".loadingDiv_k").remove();
}

function IsAlphaNumeric2(e) {
    var t;
    var n;
    var r;
    if (e.which) {
        t = e.which
    };
    n = String.fromCharCode(t);
    if (n == "`" || n == "!" || n == "@" || n == "#" || n == "$" || n == "%" || n == "^" || n == "&" || n == "*" || n == "(" || n == ")" || n == "-" || n == "_" || n == "=" || n == "+" || n == "]" || n == "}" || n == "[" || n == "{" || n == "'" || n == '"' || n == ";" || n == ":" || n == "/" || n == "?" || n == ">" || n == "," || n == "<" || n == "\\" || n == "|" || n == "~") {
        return false;
    } else {
        return true;
    }
}